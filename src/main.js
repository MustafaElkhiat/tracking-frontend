import {createApp} from 'vue'
import router from "./router/index";
import store from "./store/index";
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import setupInterceptors from './services/setupInterceptors';

setupInterceptors(store,router);

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
