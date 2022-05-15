import { createApp } from 'vue'
import App from './pages/App'
import './services'
import store from './store'
import router from './router'
import { plugin, defaultConfig } from '@formkit/vue'

createApp(App)
    .use(router)
    .use(store)
    .use(plugin, defaultConfig)
    .mount('#app')