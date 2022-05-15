import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/pages/guest/home')
const Login = () => import('@/pages/guest/login')
const Register = () => import('@/pages/guest/register')

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

export default router
