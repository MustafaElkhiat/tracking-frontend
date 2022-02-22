import axiosInstance from "./api";
import TokenService from "./token.service";

const setup = (store,router) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers["Authorization"] = "Bearer " + token;  // for Spring Boot back-end
                //config.headers["x-access-token"] = token; // for Node.js Express back-end
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;
            if (originalConfig.url !== "login" && err.response) {
                if (originalConfig.url === "api/user/refreshToken" && err.response.status === 401) {
                    store.dispatch("auth/logout").then(
                        () => {
                            router.push({name:"login"})
                            //this.$router.push("/profile");
                            console.log("Automatic Logged out successfully");
                        });
                } else {
                    // Access Token was expired
                    if (err.response.status === 401 && !originalConfig._retry) {
                        originalConfig._retry = true;
                        try {
                            const rs = await axiosInstance.get("api/user/refreshToken", {
                                headers: {
                                    Authorization: "Bearer " + TokenService.getLocalRefreshToken()
                                }
                            });

                            const accessToken = rs.data.access_token;
                            //console.log(accessToken);
                            store.dispatch('auth/refreshToken', accessToken);
                            TokenService.updateLocalAccessToken(accessToken);
                            return axiosInstance(originalConfig);
                        } catch (_error) {
                            console.log("refresh token error : " + _error)
                            return Promise.reject(_error);
                        }
                    }
                }
            }
            return Promise.reject(err);
        }
    );
};
export default setup;