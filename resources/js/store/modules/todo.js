import todoService from '@/services/todo'

export default {
	namespaced: true,
	state: {
		list: [],
		todo: null
	},
	getters: {
		list(state) {
			return state.list
		},
		todo(state) {
			return state.todo
		}
	},
	mutations: {
		setList(state, payload) {
			state.list = payload
		},
		setTodo(state, payload) {
			state.todo = payload
		}
	},
	actions: {
		getList(context) {
            todoService.getList()
                .then(res => {
                    context.commit('setList', res.data)
                })
		},
		create(context, { params }) {
			return todoService.create(params)
		},
		read(context, { id }) {
			return todoService.read(id)
		},
		update(context, { id, params }) {
			return todoService.update(id, params)
		},
		delete(context, { id }) {
			return todoService.delete(id)
		}
    }
}