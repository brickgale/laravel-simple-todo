<template>
    <div class="register">
        <div class="register-con">
            <FormKit
                type="form"
                v-model="formData"
                :actions="false"
            >
                <h1 class="title">Register</h1>
                <FormKit
                    type="text"
                    name="name"
                    label="Username"
                    placeholder="Username"
                    validation="required"
                />
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
                <FormKit
                    type="password"
                    name="password_confirm"
                    label="Confirm password"
                    placeholder="Confirm password"
                    validation="required|confirm"
                />
                <div class="btn-con">
                    <button class="btn" @click="register">
                        Signup
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

            function register() {

            }

            return {
                formData,
                register
            }
        }
    }
</script>

<style lang="scss">
.register {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .register-con {
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