import axios from '@/services'

export default {
	login(payload) {
		return axios.post(`api/login`, payload)
    },
	register(payload) {
		return axios.post(`api/register`, payload)
    },
	getUser() {
		return axios.get(`api/user`)
    },
	logout() {
		return axios.post(`api/logout`)
    }
}