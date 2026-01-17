import type { App } from "vue"
import api from "@/api"

export default {
  install: (app: App): void => {
    app.config.globalProperties.$http = api
  }
}
