<template>
    <transition name="slide">
        <div class="bg-light border-end vh-100" id="sidebar-wrapper" v-show="isSideBarOpened">
            <div class="flex-shrink-0 p-3 h-100" style="width: 280px;">
                <a href="/" class="d-flex align-content-center link-dark text-decoration-none">
                    <img
                            class="w-75 mx-4"
                            src="../../assets/logo.png"
                            alt=""
                            height="150"
                    />
                </a>
                <a class="d-flex align-content-center link-dark text-decoration-none px-4 border-bottom"><strong><h3>Company Name</h3></strong></a>
                <ul class="list-unstyled ps-0" id="sidebarList" v-if="loggedIn && user.activated">
                    <li class="mb-1">
                        <button class="btn btn-toggle align-items-center rounded collapsed pointer"
                                data-bs-toggle="collapse"
                                data-bs-p
                                data-bs-target="#home-collapse" aria-controls="home-collapse" aria-expanded="false">
                            Home
                        </button>
                        <div class="collapse" id="home-collapse" style="" data-bs-parent="#sidebarList">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" class="link-dark rounded">Overview</a></li>
                                <li><a href="#" class="link-dark rounded">Updates</a></li>
                                <li><a href="#" class="link-dark rounded">Reports</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="mb-1">
                        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse"
                                data-bs-target="#dashboard-collapse" aria-expanded="false">
                            Dashboard
                        </button>
                        <div class="collapse" id="dashboard-collapse" style="" data-bs-parent="#sidebarList">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" class="link-dark rounded">Overview</a></li>
                                <li><a href="#" class="link-dark rounded">Weekly</a></li>
                                <li><a href="#" class="link-dark rounded">Monthly</a></li>
                                <li><a href="#" class="link-dark rounded">Annually</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="mb-1">
                        <button class="btn btn-toggle align-items-center rounded" data-bs-toggle="collapse"
                                data-bs-target="#orders-collapse" aria-expanded="true">
                            Orders
                        </button>
                        <div class="collapse show" id="orders-collapse" style="" data-bs-parent="#sidebarList">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" class="link-dark rounded">New</a></li>
                                <li><a href="#" class="link-dark rounded">Processed</a></li>
                                <li><a href="#" class="link-dark rounded">Shipped</a></li>
                                <li><a href="#" class="link-dark rounded">Returned</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="border-top my-3"></li>
                    <li class="mb-1">
                        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse"
                                data-bs-target="#account-collapse" aria-expanded="false">
                            Account
                        </button>
                        <div class="collapse" id="account-collapse" data-bs-parent="#sidebarList">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" class="link-dark rounded">New...</a></li>
                                <li><a href="#" class="link-dark rounded">Profile</a></li>
                                <li><a href="#" class="link-dark rounded">Settings</a></li>
                                <li><a href="#" class="link-dark rounded">Sign out</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Sidebar',
        computed: {
            isSideBarOpened() {
                return this.$store.state.sideBarOpened;
            },
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            },
            user() {
                return this.$store.state.auth.user
            }
        },
    };
</script>
<style>
    .btn-toggle {
        display: inline-flex;
        align-items: center;
        padding: .25rem .5rem;
        font-weight: 600;
        color: rgba(0, 0, 0, .65);
        background-color: transparent;
        border: 0;
    }

    .btn-toggle:hover
        /*.btn-toggle:focus*/
    {
        color: blue;
        background-color: #d2f4ea;
    }

    .btn-toggle:before {
        width: 1.25em;
        line-height: 0;
        content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
        transition: transform .35s ease;
        transform-origin: .5em 50%;
        display: inline-block;

    }

    .btn-toggle[aria-expanded="true"] {
        color: blue;
    }

    .btn-toggle[aria-expanded="true"]:before {
        transform: rotate(90deg);
    }

    .btn-toggle-nav a {
        display: inline-flex;
        padding: .1875rem .5rem;
        margin-top: .125rem;
        margin-left: 1.25rem;
        text-decoration: none;
    }

    .btn-toggle-nav a:hover,
    .btn-toggle-nav a:focus {
        background-color: #d2f4ea;
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: margin-left 1s ease;
    }

    .slide-enter-from,
    .slide-leave-to {
        /*transform: translateX(-100%);*/
        margin-left: -280px;
    }

    .slide-enter-to,
    .slide-leave-from {
        /*transform: translateX(-100%);*/
        margin-left: 0;
    }
</style>
