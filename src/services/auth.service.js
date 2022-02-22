import api from './api';
import TokenService from './token.service';


class AuthService {
    login(user) {
        const formData = new FormData();
        formData.append("username", user.username);
        formData.append("password", user.password);
        return api({
            method: "post",
            url: "login",
            data: formData,
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
        })
            .then(response => {
                //console.log("access_token : "+JSON.stringify(response.data.access_token))
                //console.log("refresh_token : "+JSON.stringify(response.data.refresh_token))
                //console.log("user : "+JSON.stringify(response.data.user))
                TokenService.setUser(response.data);


                return response.data;
            });
    }

    /*  refreshToken() {
          const refresh_token = JSON.parse(localStorage.getItem('refresh_token'));
          console.log("refresh_token : "+refresh_token)
          return axios({
              method: "get",
              url: API_URL + "/api/user/refreshToken",
              headers: {"Authorization": "Bearer " + refresh_token},
          })
              .then(response => {
                  if (response.data.access_token) {
                      localStorage.removeItem('access_token')
                      localStorage.removeItem('refresh_token')
                      localStorage.setItem('access_token', JSON.stringify(response.data.access_token))
                      localStorage.setItem('refresh_token', JSON.stringify(response.data.refresh_token))
                  }

                  return response.data;
              });
      }*/

    logout() {
        TokenService.removeUser();
    }

    activateUser(password) {
        const user = TokenService.getUser()
        let data = {
            "user": user,
            "password": password
        }
        console.log(JSON.stringify(data))
        return api.put("api/user/activate", data, {
                headers: {
                    "Content-Type": "application/json",
                }
                //headers: {"Authorization": "Bearer " + access_token},
            },
        ).then(
            response => {
                TokenService.updateUser(response.data);
                return response.data;
            },
            error => {
                console.log("error :" + error.response)
                return Promise.reject(error)
            });
    }

    register(user) {
        return api.post('signup', {
            username: user.username,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();