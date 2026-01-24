<script setup lang="ts">
import { ref } from "vue"
import { useAuth } from "@/composables/mutations/useAuth"
import type { LoginCredentials } from "@/types/types"

const { login } = useAuth()

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

<template>
  <div class="min-h-screen flex py-50 justify-center">
    <div class="max-w-100 w-full">
      <div class="mb-10">
        <AppLogo />
      </div>
      <form @submit.prevent="submit">
        <div class="space-y-2 mb-2">
          <div class="relative text-sm">
            <AppInput v-model="form.identity" placeholder="Email or username" autocomplete="username" type="text"
              required>
              <template #icon>
                <i class="pi pi-user absolute left-3 top-1/2 -translate-y-1/2 text-border"></i>
              </template>
            </AppInput>
          </div>
          <div class="relative text-sm">
            <AppInput v-model="form.password" placeholder="Password" autocomplete="current-password" type="password"
              required>
              <template #icon>
                <i class="pi pi-key absolute left-3 top-1/2 -translate-y-1/2 text-border"></i>
              </template>
            </AppInput>
          </div>
        </div>
        <a href="#" class="text-sm text-secondary hover:underline">
          Forgot your password?
        </a>
        <button type="submit"
          class="w-full py-1.5 bg-primary rounded text-sm text-white hover:bg-primary/90 cursor-pointer mt-10">
          Login
        </button>
      </form>
    </div>
  </div>
</template>
