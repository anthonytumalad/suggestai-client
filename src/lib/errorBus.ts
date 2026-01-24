import mitt from "mitt"

type ErrorEvents = {
  "api:error": {
    message: string
    severity: "success" | "info" | "warn" | "error" | "loading"
  }
}

export const errorBus = mitt<ErrorEvents>()
