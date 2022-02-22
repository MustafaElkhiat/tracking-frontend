<template>
    <div class="form-signin">
        <form @keyup.enter="handleLogin(user)" @submit.prevent="handleLogin(user)" class="needs-validation"
              :class="!isFormValidate?'was-validated':''" novalidate>
            <!--<img
                    class="mb-4 w-100"
                    src="../assets/logo.png"
                    alt=""
                    height="200"
            />-->
            <h1 class="h3 mb-3 mt-5 fw-normal text-center">Login</h1>

            <div class="form-floating my-2">
                <input
                        v-model="user.username"
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="Username"
                        required
                        autocomplete="off"
                        :class="!isFormValidate?'invalid':''"
                />
                <div class="invalid-feedback">
                    Please provide a username.
                </div>
                <label for="floatingInput">Username</label>
            </div>

            <div class="form-floating my-2">
                <input
                        v-model="user.password"
                        type="password"
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        required
                        :class="!isFormValidate?'invalid':''"
                />
                <div class="invalid-feedback">
                    Please provide a password.
                </div>
                <label for="floatingPassword">Password</label>
            </div>
            <div class="alert alert-danger d-flex align-items-center" role="alert" v-if="message">
                <i class="bi bi-exclamation-triangle-fill mx-2"></i>
                <div class="text-center">
                    {{message}}
                </div>
            </div>
            <button
                    class="w-100 btn btn-lg btn-primary"
                    type="submit"
            >
                Login
            </button>
        </form>
    </div>
</template>
<script>
    import useVuelidate from '@vuelidate/core'
    import {required} from '@vuelidate/validators'
    import TokenService from "../services/token.service";

    export default {
        name: "Login",
        setup() {
            return {v$: useVuelidate()}
        },
        data() {
            return {
                user: {
                    username: "",
                    password: "",
                },
                isFormValidate: true,
                message: "",
                error: false
            };
        },
        validations() {
            return {
                user: {
                    username: {required},
                    password: {required},
                },
            }
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            },
        },
        methods: {
            /* handleLogin() {
              const formData = new FormData();
              formData.append("username", this.user.username);
              formData.append("password", this.user.password);
              axios({
                method: "post",
                url: "http://localhost:8080/login",
                data: formData,
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
              }).then((response) => {
                console.log(response.data.access_token);
                console.log(response.data.user);
              });

            }, */
            async handleLogin(user) {
                const result = await this.v$.$validate()
                if (!result) {
                    // notify user form is invalid
                    this.isFormValidate = false
                    console.log("Form Invalid")
                    return
                }
                this.isFormValidate = true
                this.$store.dispatch("auth/login", user).then(
                    () => {
                        const loginUser = TokenService.getUser()
                        if (loginUser.activated) {
                            this.$router.push({name: "home"});
                            console.log("Logged In successfully");

                        } else {
                            this.$router.push({name: "activation"})

                        }

                    },
                    (error) => {
                        this.error = true
                        this.message =
                            (error.response &&
                                error.response.data &&
                                error.response.data.error_message) ||
                            error.message ||
                            error.toString();
                        console.log(this.message)
                    }
                );
            },
        },
    };
</script>
<style scoped>
    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: 200px auto;
    }

    .form-signin .checkbox {
        font-weight: 400;
    }

    .form-signin .form-floating:focus-within {
        z-index: 2;
    }

    /*.form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }*/
</style>
