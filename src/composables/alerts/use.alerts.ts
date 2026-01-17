import { ref } from "vue"

export type AlertSeverity = "success" | "info" | "warn" | "error" | "loading"

export interface AlertMessage {
  id: number
  message: string
  severity: AlertSeverity
  duration?: number
}

const alerts = ref<AlertMessage[]>([])

let idCounter = 0

export function useAlerts() {
  const addAlert = (
    message: string,
    severity: AlertSeverity = "info",
    duration = 8000
  ) => {
    const id = ++idCounter
    const alert: AlertMessage = { id, message, severity, duration }
    alerts.value.push(alert)

    if (severity !== "loading") {
      setTimeout(() => removeAlert(id), duration)
    }
  }

  const removeAlert = (id: number) => {
    const index = alerts.value.findIndex(a => a.id === id)
    if (index !== -1) alerts.value.splice(index, 1)
  }

  return { alerts, addAlert, removeAlert }
}
