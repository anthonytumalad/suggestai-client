<template>
  <div class="min-h-screen flex py-50 justify-center">
    <div class="max-w-xs w-full">
      <div class="mb-10">
        <AppLogo />
      </div>
      <form @submit.prevent="submit">
        <div class="space-y-2 mb-2">
          <div class="relative text-sm">
            <i class="pi pi-user absolute left-3 top-1/2 -translate-y-1/2 text-border"></i>
            <input
              v-model="form.identity"
              type="text"
              placeholder="Email or username"
              autocomplete="username"
              required
              class="w-full pl-10 py-1.5 bg-white border border-border rounded transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primary"
            >
          </div>
          <div class="relative text-sm">
            <i class="pi pi-key absolute left-3 top-1/2 -translate-y-1/2 text-border"></i>
            <input
              v-model="form.password"
              type="password"
              placeholder="Password"
              autocomplete="current-password"
              required
              class="w-full pl-10 py-1.5 bg-white border border-border rounded transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primary"
            >
          </div>
        </div>
        <a href="#" class="text-sm text-secondary hover:underline">
          Forgot your password?
        </a>
        <button
          type="submit"
          class="w-full py-1.5 bg-primary rounded text-sm text-white hover:bg-primary/90 cursor-pointer mt-10"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { UseAuth } from "@/composables/mutations/use.auth"
import type { LoginCredentials } from "@/types/auth.types"

const { login } = UseAuth()

const form = ref<LoginCredentials>({
  identity: '',
  password: ''
})

const submit = () => {
  login.mutate({
    identity: form.value.identity.trim(),
    password: form.value.password
  })
}
</script>
