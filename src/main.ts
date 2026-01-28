import './assets/css/main.css'

import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from './lib/queryClient'
import { composablesPlugins } from './plugins/composables'
import ToastService from 'primevue/toastservice'
import Toast from "primevue/toast"
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'
import router from './router'

import Input from './components/ui/input/Input.vue'
import AppLogo from './components/AppLogo.vue'
import AppTable from './components/ui/table/AppTable.vue'
import AppButton from './components/ui/button/AppButton.vue'
import AppDatePicker from './components/ui/datepicker/AppDatePicker.vue'

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
app.use(composablesPlugins)

app.component('AppInput', Input)
app.component('AppLogo', AppLogo)
app.component("AppToast", Toast)
app.component("AppTable", AppTable)
app.component("AppButton", AppButton)
app.component("AppDatePicker", AppDatePicker)

app.mount('#app')
