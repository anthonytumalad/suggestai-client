<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />
    <main class="flex-1">
      <AppAlert />
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
import AppAlert from '@/components/ui/alert/AppAlert.vue'
</script>
