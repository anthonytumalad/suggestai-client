<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/mutations/useAuth'
import AppLogo from './AppLogo.vue'

defineProps<{
  collapsed?: boolean
}>()

const emit = defineEmits(['close'])

const route = useRoute()
const router = useRouter()
const { logout } = useAuth()

const menuItems = [
  { label: 'Dashboard', name: 'dashboard', icon: 'pi pi-home' },
  { label: 'Form', name: 'forms-list', icon: 'pi pi-file-edit' },
  { label: 'Reports', name: 'reports', icon: 'pi pi-chart-line' },
  { label: 'Trash', name: 'trash', icon: 'pi pi-trash' },
]

const isActive = (name: string) => route.name === name

const navigate = (name: string) => {
  router.push({ name })
  if (window.innerWidth < 1024) {
    emit('close')
  }
}

const handleLogout = () => {
  logout.mutate()
}
</script>

<template>
  <aside
    class="fixed bg-base left-0 top-0 z-40 flex h-screen border-r border-border flex-col transition-all duration-300 ease-in-out"
    :class="collapsed ? 'w-18' : 'w-64'"
  >
    <header class="h-14 flex justify-between items-center px-4">
      <AppLogo v-if="!collapsed" />
    </header>

    <nav class="flex-1 p-2 space-y-1 overflow-y-auto">
      <button
        v-for="item in menuItems"
        :key="item.name"
        @click="navigate(item.name)"
        class="flex items-center gap-3 w-full px-3 py-2 rounded-md transition duration-200 group relative cursor-pointer"
        :class="[
          isActive(item.name)
            ? 'bg-fg-base-secondary font-medium text-primary'
            : 'hover:bg-fg-base-secondary text-secondary'
        ]"
      >
        <i :class="item.icon" class="text-lg shrink-0 transition-colors" />
        <span
          v-if="!collapsed"
          class="text-sm truncate transition-opacity"
        >
          {{ item.label }}
        </span>

        <div
          v-if="collapsed"
          class="absolute left-full ml-2 hidden group-hover:block bg-gray-800 text-white text-sm px-3 py-1.5 rounded-md whitespace-nowrap z-50 shadow-lg"
        >
          {{ item.label }}
        </div>
      </button>
    </nav>

    <footer class="h-14 flex items-center px-4">
      <button
        @click="handleLogout"
        :disabled="logout.isPending.value"
        class="flex items-center gap-2 text-sm text-red-600 hover:opacity-80"
      >
        <i class="pi pi-sign-out" />
        Logout
      </button>
    </footer>
  </aside>
</template>
