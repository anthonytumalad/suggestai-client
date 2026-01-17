<template>
  <div
    v-for="alert in alerts"
    :key="alert.id"
    :class="[
      'flex items-center w-full justify-between text-sm p-4 border space-x-4 my-4',severityClasses(alert.severity)
    ]"
  >
    <div class="flex items-center space-x-4">
      <i :class="severityIcons(alert.severity)"></i>
      <span class="flex-1">{{ alert.message }}</span>
    </div>

    <button
      v-if="alert.severity !== 'loading'"
      class="ml-2 font-bold hover:text-fg-base cursor-pointer"
      @click="removeAlert(alert.id)"
    >
      <i class="pi pi-times"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAlerts } from "@/composables/alerts/use.alerts"

const { alerts, removeAlert } = useAlerts()


const severityClasses = (severity: string) => {
  switch (severity) {
    case "success":
      return "bg-green-50 text-green-800 border-green-300"
    case "info":
      return "bg-blue-50 text-blue-800 border-blue-300"
    case "warn":
      return "bg-warning text-yellow-800 border-yellow-300"
    case "error":
      return "bg-red-50 text-red-800 border-red-300"
    case "loading":
      return "bg-gray-50 text-gray-800 border-gray-300"
    default:
      return "bg-gray-50 text-gray-800 border-gray-300"
  }
}

const severityIcons = (severity: string) => {
  switch (severity) {
    case "success":
      return "pi pi-check text-green-600"
    case "info":
      return "pi pi-info-circle text-blue-600"
    case "warn":
      return "pi pi-exclamation-triangle text-yellow-600"
    case "error":
      return "pi pi-times-circle text-red-600"
    case "loading":
      return "pi pi-spin pi-spinner text-gray-600"
    default:
      return ""
  }
}

</script>
