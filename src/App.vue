<template>
  <router-view />
</template>

<script setup lang="ts">
import { useErrorBusAlerts } from './composables/alerts/use.error.bus.alert'

useErrorBusAlerts()
</script>
