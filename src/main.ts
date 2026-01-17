import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from './lib/query.client'
import App from './App.vue'
import router from './router'
import http from './plugins/http'
import AppLogo from './components/AppLogo.vue'
import './assets/css/index.css'


const app = createApp(App)

app.component('AppLogo', AppLogo)

app.use(router)
app.use(http)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
