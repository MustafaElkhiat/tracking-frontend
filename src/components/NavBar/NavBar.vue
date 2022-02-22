<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <i class="bi bi-arrow-bar-left text-white sidebar-toggler pointer" :class="isSideBarOpened?'':'closed'"
               style="font-size: 1.25rem" @click="toggleSideBar"></i>
            <!-- <button class="btn btn-primary sidebar-toggler" :class="isSideBarOpened?'':'closed'" @click="toggleSideBar">
                 <i class="bi bi-arrow-bar-left" style="font-size: 1.25rem"></i>
             </button>-->
            <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link active" :to="{name:'home'}">Home</router-link>
                    </li>
                    <li class="nav-item" v-if="user && user.authorities[0].authority === 'ADMIN_ROLE'">
                        <router-link class="nav-link" :to="{name:'addUser'}">Add User</router-link>
                    </li>
                    <li class="nav-item" v-if="user && user.authorities[0].authority === 'FOLLOWER_ROLE'">
                        <router-link class="nav-link" :to="{name:'addMovement'}">Add Movement</router-link>
                    </li>
                    <!--<li class="nav-item dropdown">
                        <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                        >
                            Dropdown
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <hr class="dropdown-divider"/>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a
                                class="nav-link disabled"
                                href="#"
                                tabindex="-1"
                                aria-disabled="true"
                        >Disabled</a
                        >
                    </li>-->
                </ul>
                <form class="d-flex">
                    <!-- <input
                             class="form-control me-2"
                             type="search"
                             placeholder="Search"
                             aria-label="Search"
                     />
                     <button class="btn btn-outline-success" type="button">
                         Search
                     </button>-->


                    <div class="dropdown mx-3 my-auto" v-if="loggedIn">
                        <a class="text-decoration-none link-light dropdown-toggle" href="#" role="button"
                           id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" alt=""
                                 width="32" height="32"
                                 class="rounded-circle me-2">
                            <strong>{{user.name}}</strong>
                        </a>

                        <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                            aria-labelledby="dropdownMenuLink">
                            <li style="padding: 0.25rem 0.5rem">{{user.name}}</li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">New project...</a></li>
                            <li><a class="dropdown-item" href="#">Settings</a></li>
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item pointer" data-bs-toggle="modal"
                                   data-bs-target="#logoutConfirmation">Logout</a></li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    </nav>
    <Confirm content="Do you really want to logout?" id="logoutConfirmation" title="Logout" @accept="handleLogout"/>
</template>

<script>
    import Confirm from "../Confirm";

    export default {
        name: 'NavBar',
        components: {Confirm},
        computed: {
            isSideBarOpened() {
                return this.$store.state.sideBarOpened;
            },
            user() {
                return this.$store.state.auth.user
            },
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        methods: {
            handleLogout() {

                this.$store.dispatch("auth/logout").then(
                    () => {
                        this.$router.push({name: "login"});
                        console.log("Logged out successfully");
                    },
                    (error) => {
                        this.message =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                    }
                );
            },
            toggleSideBar() {
                this.$store.commit('updateSideBarOpened', !this.isSideBarOpened)
            }
        },
    };
</script>
<style>
    .sidebar-toggler {
        transition: transform .35s ease;
        display: inline-block;
    }

    .sidebar-toggler.closed {
        transform: rotate(180deg);

    }

    .pointer {
        cursor: pointer !important;
    }
</style>