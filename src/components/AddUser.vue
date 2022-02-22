<template>
    <div class="row mt-3">
        <div class="col">
            <div class="form-floating">
                <input type="text" class="form-control" id="name" v-model="name" placeholder="Name">
                <label for="name">Name</label>
            </div>
        </div>
        <div class="col">
            <div class="form-floating">
                <input type="text" class="form-control" id="username" v-model="username" placeholder="Username">
                <label for="username">Username</label>
            </div>
        </div>
        <div class="col">
            <div class="form-floating">
                <input type="text" class="form-control" id="password" v-model="password" placeholder="Password">
                <label for="password">Password</label>
            </div>
        </div>

    </div>
    <div class="row mt-3">
        <div class="col-4">
            <div class="form-floating">
                <select class="form-select" id="role" v-model="role">
                    <option selected hidden disabled value="">Select Role</option>
                    <option value="LEADER_ROLE">Leader</option>
                    <option value="FOLLOWER_ROLE">Follower</option>
                    <option value="ADMIN_ROLE">Admin</option>
                </select>
                <label for="role">Role</label>
            </div>
        </div>

        <transition name="fade">
            <div class="col-4" v-if="role == 'FOLLOWER_ROLE'">
                <div class="form-floating">
                    <select class="form-select" id="leader" v-model="leader">
                        <option selected hidden disabled value="0">Select Leader</option>
                        <option v-for="leader in leaders" :key="leader.id" :value="leader">{{leader.name}}</option>
                    </select>
                    <label for="leader">Leader</label>
                </div>
            </div>
        </transition>
        <div class="col-4">
            <button
                    class="w-100 h-100 btn btn-lg btn-primary"
                    type="button" @click="addUser">
                Add User
            </button>
        </div>


    </div>
</template>

<script>
    import DataService from "../services/data_service";

    export default {
        name: "AddUser",
        data() {
            return {
                name: "",
                username: "",
                password: "",
                leaders: "",
                role: "",
                leader: "0",
            }
        },
        mounted() {
            this.getLeaders()
        },
        methods: {
            getLeaders() {
                DataService.getLeaders().then(
                    data => this.leaders = data,
                    error => console.log(error.response)
                )
            },
            addUser(){

                let leader
                if(this.leader == "0")
                   leader = null
                else
                    leader = this.leader
                DataService.addUser(this.name,this.username,this.password,leader,this.role).then(
                    response => console.log("response : " + response),
                    error => console.log(error.response)
                )
            }
        }
    }
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
    .col-4{
        transition: all 1s;
    }
</style>