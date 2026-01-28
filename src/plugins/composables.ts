import type { App } from "vue"
import * as Auth from '@/composables/auth'
import * as Forms from '@/composables/forms'

export interface Composables {
  useAuth: typeof Auth.useAuth
  useFormsList: typeof Forms.useFormsList
}

export const composablesPlugins = {
  install(app: App) {
    const composables: Composables = {
        useAuth: Auth.useAuth,
        useFormsList: Forms.useFormsList,
    }

    app.config.globalProperties.$composables = composables
  }
}
