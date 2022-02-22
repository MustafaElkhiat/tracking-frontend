import AuthService from '../services/auth.service';
import TokenService from '../services/token.service'

const user = TokenService.getUser();
const access_token = TokenService.getLocalAccessToken();
const refresh_token = TokenService.getLocalRefreshToken();
const initialState = user
    ? {status: {loggedIn: true}, user, access_token, refresh_token}
    : {status: {loggedIn: false}, user: null, access_token: null, refresh_token: null};

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({commit}, user) {
            return AuthService.login(user).then(
                data => {
                    commit('loginSuccess', data);
                    return Promise.resolve(data);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        activate({commit}, password) {
            console.log(password)
            return AuthService.activateUser(password).then(
                data => {
                    commit('activate', data);
                    return Promise.resolve(data)
                },
                error => {
                    return Promise.reject(error)
                }
            );
        },
        /*refreshToken({commit}){
            return AuthService.refreshToken().then(
                data =>{
                    commit('refreshToken',data)
                    return Promise.resolve(data)
                }

            );
        },*/
        refreshToken({commit}, accessToken) {
            commit('refreshToken', accessToken);
        },

        logout({commit}) {
            AuthService.logout();
            commit('logout');
        },
        register({commit}, user) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        loginSuccess(state, data) {
            state.status.loggedIn = true;
            state.user = data.user;
            state.access_token = data.access_token;
            state.refresh_token = data.refresh_token;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
            state.access_token = null;
            state.refresh_token = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
            state.access_token = null;
            state.refresh_token = null;
        },
        activate(state, data) {
            state.user = data;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        },
        refreshToken(state, access_token) {
            state.access_token = access_token;
        }
    }
};