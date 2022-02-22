<template>
    <div class="form-activation">
        <form @keyup.enter="handleActivate(user)" @submit.prevent="handleActivate(user)" class="needs-validation"
              :class="!isFormValidate?'was-validated':''" novalidate>
            <!--<img
                    class="mb-4 w-100"
                    src="../assets/logo.png"
                    alt=""
                    height="200"
            />-->
            <h1 class="h3 mb-3 mt-5 fw-normal text-center">Activation</h1>
            <h3 class="text-center">Create your password to activate your account</h3>
            <div class="form-floating my-2">
                <input
                        v-model="password.password"
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="Password"
                        required
                        autocomplete="off"
                        :class="!isFormValidate?'invalid':''"
                />
                <div class="invalid-feedback">
                    Please provide a username.
                </div>
                <label for="password">Password</label>
            </div>

            <div class="form-floating my-2">
                <input
                        v-model="password.confirm"
                        type="password"
                        class="form-control"
                        id="confirm"
                        placeholder="Confirm Password"
                        required
                        :class="!isFormValidate?'invalid':''"
                />
                <div class="invalid-feedback">
                    Please provide a password.
                </div>
                <label for="confirm">Confirm Password</label>
            </div>
            <div class="alert alert-danger d-flex align-items-center" role="alert" v-if="message">
                <i class="bi bi-exclamation-triangle-fill mx-2"></i>
                <div class="text-center">
                    {{message}}
                </div>
            </div>
            <div class="alert alert-danger d-flex align-items-center" role="alert"
                 v-if="password.password !== password.confirm">
                <i class="bi bi-exclamation-triangle-fill mx-2"></i>
                <div class="text-center">
                    The password confirmation doesn't match
                </div>
            </div>
            <button
                    :disabled="password.password !== password.confirm || password.password =='' && password.confirm == ''"
                    class="w-100 btn btn-lg btn-primary"
                    type="submit"
            >
                Activate
            </button>
        </form>
    </div>
</template>

<script>
    import useVuelidate from '@vuelidate/core'
    import {required} from '@vuelidate/validators'

    export default {
        name: "Activation",

        setup() {
            return {v$: useVuelidate()}
        },
        data() {
            return {
                password: {
                    password: "",
                    confirm: "",
                },
                isFormValidate: true,
                message: "",
                error: false
            };
        },
        validations() {
            return {
                password: {
                    password: {required},
                    confirm: {required},
                },
            }
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            },
            user() {
                return this.$store.state.auth.user
            },
        },
        methods: {

            async handleActivate() {
                const result = await this.v$.$validate()
                if (!result) {
                    // notify user form is invalid
                    this.isFormValidate = false
                    console.log("Form Invalid")
                    return
                }
                this.isFormValidate = true
                this.$store.dispatch("auth/activate", this.password.password).then(
                    () => {
                        this.$router.push({name: "home"});
                        console.log("Activated successfully");
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
    .form-activation {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: 200px auto;
    }

    .form-activation .checkbox {
        font-weight: 400;
    }

    .form-activation .form-floating:focus-within {
        z-index: 2;
    }
</style>