import api from './api';
import TokenService from '../services/token.service'


class DataService {
    getLastMoveOfFollowersOfLeader() {
        const user = TokenService.getUser()
        return api.get("api/user/lastMoveOfFollowersOfLeader", {
                params: {username: user.username},
            }
        ).then(
            response => {
                return response.data;
            },
            error => {
                return Promise.reject(error)
                /*let errorResponse = error.response
                if (errorResponse.status == 403 && errorResponse.data.error_message.includes('The Token has expired')) {
                    store.dispatch('auth/refreshToken').then(() => console.log("access_token has been refreshed"), (error) => {
                        if (error.response.data.error_message.includes('The Token has expired')) {
                            store.dispatch('auth/logout').then(() => console.log("Automatic Logout"))
                        }
                        this.getLastMoveOfFollowersOfLeader()
                    }
                )
            }*/
            });
    }

    getLastMoveOfUser() {
        const user = TokenService.getUser()
        return api.get("api/user/lastMoveOfUser", {
                params: {username: user.username},
            }
        ).then(
            response => {
                return response.data;
            },
            error => {
                return Promise.reject(error)
                /*let errorResponse = error.response
                if (errorResponse.status == 403 && errorResponse.data.error_message.includes('The Token has expired')) {
                    store.dispatch('auth/refreshToken').then(() => console.log("access_token has been refreshed"), (error) => {
                        if (error.response.data.error_message.includes('The Token has expired')) {
                            store.dispatch('auth/logout').then(() => console.log("Automatic Logout"))
                        }
                        this.getLastMoveOfFollowersOfLeader()
                    }
                )
            }*/
            });
    }

    getLeaders() {
        return api.get("api/user/leaders"
        ).then(
            response => {
                return response.data;
            },
            error => {
                return Promise.reject(error)
            });
    }


    addMovement(latitude, longitude, location, from, to) {
        const user = TokenService.getUser()
        //console.log(user)
        let data = {
            "from": from,
            "to": to,
            "location": {
                "location": location,
                "latitude": latitude,
                "longitude": longitude
            },
            "user": user
        }
        return api.post("api/user/userMovement", data
        ).then(
            response => {
                return response.data;
            },
            error => {
                console.log("error :" + error.response)
                return Promise.reject(error)
                /*let errorResponse = error.response
                if (errorResponse.status == 403 && errorResponse.data.error_message.includes('The Token has expired')) {
                    store.dispatch('auth/refreshToken').then(() => console.log("access_token has been refreshed"), (error) => {
                        if (error.response.data.error_message.includes('The Token has expired')) {
                            store.dispatch('auth/logout').then(() => console.log("Automatic Logout"))
                        }
                        this.getLastMoveOfFollowersOfLeader()
                    }
                )
            }*/
            });
    }

    addUser(name, username, password, leader, authority) {
        let data = {
            "name": name,
            "username": username,
            /*"password": password,*/
            "leader": leader,
            "authorities": [
                {
                    "authority": authority
                }
            ]
        }
        //console.log(JSON.stringify(data))
        return api.post("api/user/user", data
        ).then(
            response => {
                return response.data;
            },
            error => {
                console.log("error :" + error.response)
                return Promise.reject(error)
            });
    }


}

export default new DataService();