<script setup lang="ts">
import { onMounted } from "vue"
import { useToast } from "primevue/usetoast"
import { initGlobalToast } from './lib/globalToast'

const toast = useToast()

onMounted(() => {
  initGlobalToast(toast)
})
</script>

<template>
  <AppToast />
  <router-view />
</template>
