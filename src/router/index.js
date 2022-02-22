import {createRouter, createWebHistory} from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import AddMovement from "../components/AddMovement";
import store from "../store";
import AddUser from "../components/AddUser";
import Activation from "../components/Activation";
/*import Register from "../components/Register.vue";
// lazy-loaded
const Profile = () => import("../components/Profile.vue")
const BoardAdmin = () => import("../components/BoardAdmin.vue")
const BoardModerator = () => import("../components/BoardModerator.vue")
const BoardUser = () => import("../components/BoardUser.vue")*/

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            title: "Home",
        },
    },
    {
        path: "/home",
        component: Home,
        meta: {
            title: "Home",
        },

    },

    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            title: "Login",
        },
    },
    {
        path: "/addMovement",
        name: "addMovement",
        component: AddMovement,
        meta: {
            title: "Add Movement",
        },

    },
    {
        path: "/addUser",
        name: "addUser",
        component: AddUser,
        meta: {
            title: "Add User",
        },

    },
    {
        path: "/activation",
        name: "activation",
        component: Activation,
        meta: {
            title: "Activation",
        },

    },
    /*{
      path: "/register",
      component: Register,
    },
    {
      path: "/profile",
      name: "profile",
      // lazy-loaded
      component: Profile,
    },
    {
      path: "/admin",
      name: "admin",
      // lazy-loaded
      component: BoardAdmin,
    },
    {
      path: "/mod",
      name: "moderator",
      // lazy-loaded
      component: BoardModerator,
    },
    {
      path: "/user",
      name: "user",
      // lazy-loaded
      component: BoardUser,
    }, */

];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {

    //next();
    const publicPages = ['/login'/*, '/register', '/home','/'*/];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = store.state.auth.status.loggedIn;

// trying to access a restricted page + not logged in
// redirect to login page
    if (authRequired && !loggedIn) {
        next({name: "login"});
    } else {
        document.title = to.meta.title + " - App";
        next();
    }
});
/* router.beforeEach((to, from, next) => {
const publicPages = ['/login', '/register', '/home','/'];
const authRequired = !publicPages.includes(to.path);
const loggedIn = localStorage.getItem('user');

// trying to access a restricted page + not logged in
// redirect to login page
if (authRequired && !loggedIn) {
  next('/login');
} else {
  next();
}
}); */

export default router;