import { useToast } from "primevue/usetoast"
import { errorBus } from "./errorBus"

type PrimeToastSeverity = "success" | "info" | "warn" | "error" | "secondary" | "contrast"

let toast: ReturnType<typeof useToast> | null = null

const severityMap: Record<string, PrimeToastSeverity> = {
  success: "success",
  info: "info",
  warn: "warn",
  error: "error",
  loading: "info",
}

export function initGlobalToast(toastInstance: ReturnType<typeof useToast>) {
  toast = toastInstance

  errorBus.on("api:error", ({ message, severity }) => {
    if (!toast) return

    toast.add({
      severity: severityMap[severity] || "info",
      summary: severity.toUpperCase(),
      detail: message,
      life: 5000,
    })
  })
}
