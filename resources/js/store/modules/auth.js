import authService from '@/services/auth'
import axios from '@/services'

export default {
	namespaced: true,
	state: {
		authenticated: false,
		token: null,
	},
	getters: {
		isAuthenticated(state) {
			return state.authenticated
		},
		token(state) {
			return state.token
		},
	},
	mutations: {
		setAuth(state, payload) {
			state.authenticated = true
			state.token = payload.data.token
			axios.defaults.headers.common['Authorization'] = 'Bearer '+ payload.data.token
		},
		removeAuth(state) {
			axios.defaults.headers.common['Authorization'] = ''
			state.authenticated = false
			state.token = null
		}
	},
	actions: {
		register(context, { params }) {
			return authService.register(params)
		},
		login(context,  { params }) {
			return new Promise((resolve, reject) => {
				authService.login(params).then(res => {
					context.commit('setAuth', res)
					context.dispatch('getUser')
					resolve(res)
				}, err => {
					reject(err)
				})
			})
		},
		getUser(context) {
			authService.getUser().then(response => {
                console.log('get user: ', response)
			}, response => {
				console.log(response)
			})
		},
		logout(context) {
			return new Promise((resolve, reject) => {
				authService.logout().then(res => {
					context.commit('removeAuth')
					resolve(res)
				}, err => {
					reject(err)
				})
			})
		}
	}
}