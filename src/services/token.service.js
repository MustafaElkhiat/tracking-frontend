class TokenService {
    getLocalRefreshToken() {
        return JSON.parse(localStorage.getItem("refresh_token"));
    }

    getLocalAccessToken() {
        return JSON.parse(localStorage.getItem("access_token"));
    }

    updateLocalAccessToken(token) {
        localStorage.setItem('access_token', JSON.stringify(token))
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    setUser(data) {
        //console.log(data.user)
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('access_token', JSON.stringify(data.access_token))
        localStorage.setItem('refresh_token', JSON.stringify(data.refresh_token))
    }
    updateUser(user){
        localStorage.setItem('user', JSON.stringify(user));
    }
    removeUser() {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }
}

export default new TokenService();