import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

import auth from './modules/auth'
import todo from './modules/todo'

window.Cookies = Cookies
const debug = process.env.NODE_ENV !== 'production'

const store = createStore({
	modules: {
		auth,
		todo
	},
	strict: debug,
	plugins: [
		createPersistedState({
			key: 'todo',
			paths: ['auth'],
			storage: {
				getItem: key => Cookies.get(key),
				setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: !debug, sameSite: 'lax' }),
				removeItem: key => Cookies.remove(key)
			}
		})
	]
})

export default store
