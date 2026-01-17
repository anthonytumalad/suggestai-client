import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from './lib/query.client'
import AppAlert from './components/ui/alert/AppAlert.vue'
import AppInput from './components/ui/input/AppInput.vue'
import App from './App.vue'
import router from './router'
import http from './plugins/http'
import AppLogo from './components/AppLogo.vue'
import './assets/css/index.css'

const app = createApp(App)

app.component('AppLogo', AppLogo)
app.component('AppAlert', AppAlert)
app.component('AppInput', AppInput)

app.use(router)
app.use(http)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
