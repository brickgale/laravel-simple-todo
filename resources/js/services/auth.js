import axios from '@/services'

export default {
	login(payload) {
		return axios.post(`api/login`, payload)
    },
	register(payload) {
		return axios.post(`api/register`, payload)
    }
}