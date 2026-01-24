import axios, { AxiosError } from "axios"
import { errorBus } from "./errorBus"
import type { ApiError } from "@/types/types"

export class errorHandler {
  private static _unauthorizedEmitted = false

  static handle(error: unknown) {
    if (axios.isAxiosError(error))
      return this.handleAxiosError(error)
    if (error instanceof Error)
      return this.emit(error.message, "error")

    this.emit("An unknown error occurred", "error")
  }

  private static emit(message: string, severity: "success" | "info" | "warn" | "error" = "error") {
    if (!message) message = "An unknown error occurred"
    errorBus.emit("api:error", { message, severity })
  }

  private static handleAxiosError(error: AxiosError) {
    const status = error.response?.status
    const data = error.response?.data as ApiError

    let message = error.message

    if (status === 422 && data?.errors) {
      message = Object.values(data.errors).flat().filter(Boolean).join(", ") || "Validation failed"
    } else if (data?.message) {
      message = data.message
    }

    switch (status) {
      case 401:
        if (!this._unauthorizedEmitted) {
          this._unauthorizedEmitted = true
          this.emit("Unauthorized — please login again", "error")
          window.location.href = "/auth/login"
          setTimeout(() => (this._unauthorizedEmitted = false), 5000)
        }
        break

      case 403:
        this.emit("You don't have permission to do this.", "error")
        break

      case 404:
        this.emit("Resource not found.", "info")
        break

      case 422:
        this.emit(message, "warn")
        break

      case 500:
        this.emit("Something went wrong. Please try again later.", "error")
        break

      default:
        this.emit(message, "error")
    }
  }
}
