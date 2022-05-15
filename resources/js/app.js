import { createApp } from 'vue'
import App from './pages/App'
import './services'
import store from './store'
import router from './router'

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')