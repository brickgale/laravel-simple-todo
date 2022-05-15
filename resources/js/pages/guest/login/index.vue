<template>
    <div class="login">
        <div class="login-con">
            <FormKit
                type="form"
                v-model="formData"
                :actions="false"
            >
                <h1 class="title">Login</h1>
                <FormKit
                    type="text"
                    name="email"
                    label="Email"
                    placeholder="example@gmail.com"
                    validation="required|email"
                />
                <FormKit
                    type="password"
                    name="password"
                    label="Password"
                    validation="required|length:6|matches:/[^a-zA-Z]/"
                    :validation-messages="{
                    matches: 'Please include at least one symbol',
                    }"
                    placeholder="Password"
                />
                <div class="btn-con">
                    <button class="btn" @click="login">
                        Login
                    </button>
                </div>
            </FormKit>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue'

    export default {
        setup() {
            const submitted = ref(false)
            const formData = ref({})

            function login() {

            }

            return {
                formData,
                login
            }
        }
    }
</script>

<style lang="scss">
.login {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-con {
        width: 100%;
        max-width: 500px;
        padding: 40px;
        box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
        h1.title {
            margin-bottom: 20px;
        }
        .btn-con {
            padding-top: 15px;  
        }
    }
}
</style>