<template>
    <header class="main-header">
        <ul class="link-con">
            <template v-if="!isAuthenticated">
                <li v-for="(nav, key) in navLinks" :key="key">
                    <router-link :to="{ name: nav.route }">
                        {{ nav.label }}
                    </router-link>
                </li>
            </template>
            <template v-else>
                <li>
                    <a href="#" @click.prevent="logout">
                        Logout
                    </a>
                </li>
            </template>
        </ul>
    </header>   
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const store = useStore()
        const router = useRouter()
        const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

        function logout() {
            store.dispatch('auth/logout')
                .then(res => {
                    router.push({ name: 'home' })
                }, err => {
                    console.log(err)
                })
        }

        return {
            isAuthenticated,
            logout,
            navLinks: [
                { label: 'Home', route: 'home' },
                { label: 'Register', route: 'register' },
                { label: 'Login', route: 'login' }
            ]
        }
    }
}
</script>

<style lang="scss">
    .main-header {
        position: absolute;
        right: 0;
        ul.link-con {
            margin: 0;
            list-style: none;
            padding-left: 0;
            display: flex;
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
            li {
                display: flex;
                a {
                    padding: 20px 15px;
                    color: #696969;
                    &.router-link-active {
                        border-bottom: 3px solid #696969;
                    }
                }
            }
        }
    }
</style>