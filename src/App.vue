<template>
    <!--<Login v-if="!loggedIn"/>-->
    <Layout/>
</template>

<script>
    //import Login from "./components/Login.vue";
    import Layout from "./components/Layout.vue";

    export default {
        name: "App",
        components: {
            // Login,
            Layout,
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            },
            user() {
                return this.$store.state.auth.user
            },
        },
        mounted() {
            if (!this.user) {
                this.$router.push({name: "login"})
            }
        }

    };
</script>

<style>
</style>
