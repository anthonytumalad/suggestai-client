import axios, { AxiosError } from "axios"
import type { ApiError } from "@/types/api.types"

export class ErrorHandler{
  static handle(error: unknown) {
    if (axios.isAxiosError(error)) {
      this.handleAxiosError(error)
      return
    }

    if (error instanceof Error) {
      this.handleGenericError(error)
      return
    }

    console.error("Unknown error:", error)
  }

  private static handleAxiosError(error: AxiosError<ApiError>) {
    const status = error.response?.status
    const message = error.response?.data?.message || error.message

    switch (status) {
      case 401:
        console.warn("Unauthorized — redirecting to login")
        window.location.href = "/auth/login"
        break

      case 403:
        console.error("Forbidden:", message)
        alert("You don't have permission to do this.")
        break

      case 404:
        console.error("Not Found:", message)
        break

      case 422:
        console.error("Validation Error:", error.response?.data?.errors)
        break

      case 500:
        console.error("Server Error:", message)
        alert("Something went wrong. Please try again later.")
        break

      default:
        console.error("API Error:", message)
    }
  }

  private static handleGenericError(error: Error) {
    console.error("App Error:", error.message)
  }
}
