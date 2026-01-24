import './assets/css/main.css'

import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from './lib/queryClient'
import ToastService from 'primevue/toastservice'
import Toast from "primevue/toast"
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'
import router from './router'
import Input from './components/ui/input/Input.vue'
import AppLogo from './components/AppLogo.vue'

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin, { queryClient })
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: 'none',
    }
  }
})
app.use(ToastService)

app.component('AppInput', Input)
app.component('AppLogo', AppLogo)
app.component("AppToast", Toast)

app.mount('#app')
