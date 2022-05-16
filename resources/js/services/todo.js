import axios from '@/services'

export default {
	getList() {
		return axios.get(`api/todos`)
    },
	create(payload) {
		return axios.post(`api/todos`, payload)
    },
	read(id) {
		return axios.get(`api/todos/${id}`)
    },
	update(id, payload) {
		return axios.put(`api/todos/${id}`, payload)
    },
	delete(id) {
		return axios.delete(`api/todos/${id}`)
    }
}