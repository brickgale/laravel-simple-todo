import axios from 'axios'
import store from '@/store'

const instance = axios.create({
    baseURL: window.location.origin
})

instance.defaults.headers.common['X-CSRF-TOKEN'] = document.getElementsByName('csrf-token')[0].getAttribute('content')
instance.defaults.headers.common['Authorization'] = (!store.getters['auth/isAuthenticated']) ? '' : 'Bearer ' + store.getters['auth/token']

export default instance