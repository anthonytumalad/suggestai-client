import { onMounted, onBeforeUnmount } from "vue"
import { errorBus } from "@/lib/error.bus"
import { useAlerts, type AlertSeverity } from "./use.alerts"

interface ErrorPayload {
  message: string
  severity?: AlertSeverity
  duration?: number
}

export function useErrorBusAlerts() {
  const { addAlert } = useAlerts()

  const handleErrorEvent = (payload: ErrorPayload) => {
    addAlert(payload.message, payload.severity ?? "error", payload.duration)
  }

  onMounted(() => {
    errorBus.on("api:error", handleErrorEvent)
  })
  onBeforeUnmount(() => {
    errorBus.off("api:error", handleErrorEvent)
  })
}
