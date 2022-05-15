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
	},
	actions: {
		register(context, {params}) {
			return authService.register(params)
		},
		login(context, {params, successCb, errorCb}) {
			authService.login(params).then(response => {
				context.commit('setAuth', response)
				context.dispatch('getUser')
				if(typeof successCb == 'function') successCb(response)
			}, errorCb)
		},
		getUser(context) {
			authService.getUser().then(response => {
                console.log('get user: ', response)
			}, response => {
				console.log(response)
			})
		},
	}
}