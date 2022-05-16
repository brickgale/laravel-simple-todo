import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import { checkNull } from '@/helpers'

const Home = () => import('@/pages/guest/home')
const Login = () => import('@/pages/guest/login')
const Register = () => import('@/pages/guest/register')
const Dashboard = () => import('@/pages/user/dashboard')

const routes = [
	{
		path: '',
		name: 'home',
		component: Home
	},
	{
		path: '/login',
		name: 'login',
		component: Login
    },
	{
		path: '/register',
		name: 'register',
		component: Register
    },
	{
		path: '/dashboard',
		name: 'dashboard',
		component: Dashboard,
		meta: {
			requiresAuth: true
		}
    }
];

const router = createRouter({
	history: createWebHistory(),
    routes,
    scrollBehavior() {
        return {
            top: 0
        }
    }
})


router.beforeEach((to, from, next) => {
	const isAuthenticated = store.getters['auth/isAuthenticated']
	if (checkNull(to.meta.requiresAuth) && !isAuthenticated) {
		next({ name: 'home' })
	} else if(!checkNull(to.meta.requiresAuth) && isAuthenticated) {
		next({ name: 'dashboard' })
	} else {
		next()
	}
})

export default router
