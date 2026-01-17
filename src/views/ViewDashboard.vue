<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-sm text-center">
      <h1 class="text-xl font-bold mb-4">Welcome!</h1>
      <button
        @click="handleLogout"
        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UseAuth } from '@/composables/mutations/use.auth';

const { logout } = UseAuth()

const handleLogout = () => {
  logout.mutate()
}
</script>

