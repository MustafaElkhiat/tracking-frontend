import {createStore} from "vuex";
import {auth} from "./auth.module";

const store = createStore({
    modules: {
        auth,
    },
    state: {
        sideBarOpened: true
    },
    mutations: {
        updateSideBarOpened(state, isOpened) {
            state.sideBarOpened = isOpened;
        }
    }

});

export default store;