<template>
    <div class="login">
        <div class="login-con">
            <FormKit
                type="form"
                v-model="formData"
                :actions="false"
                @submit="callLogin"
                ref="form"
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
                    validation="required"
                    placeholder="Password"
                />
                <div class="btn-con">
                    <button class="btn" @click.prevent="submitLogin">
                        Login
                    </button>
                </div>
            </FormKit>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'

    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const form = ref(null)
            const submitted = ref(false)
            const formData = ref({})

            function submitLogin() {
                const node = form.value.node
                node.submit()
            }

            function callLogin() {
                const node = form.value.node
                store.dispatch('auth/login', { params: formData.value })
                    .then(res => {
                        router.push({ name: 'dashboard' })
                    }, err => {
                        node.setErrors([
                            err.response.data.message
                        ])
                    })
            }

            return {
                form,
                formData,
                submitLogin,
                callLogin
            }
        }
    }
</script>

<style lang="scss">
.login {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
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