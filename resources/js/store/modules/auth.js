import authService from '@/services/auth'
import axios from '@/services'

export default {
	namespaced: true,
	state: {
		authenticated: false,
		token: null,
		user: null,
	},
	getters: {
		isAuthenticated(state) {
			return state.authenticated
		},
		token(state) {
			return state.token
		},
		user(state) {
			return state.user
		}
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
		},
		setUser(state, payload) {
			state.user = payload
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
					resolve(res)
				}, err => {
					reject(err)
				})
			})
		},
		getUser(context) {
			authService.getUser().then(res => {
				context.commit('setUser', res.data)
			}, err => {
				console.log(err)
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