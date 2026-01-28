<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/auth/useAuth'
import AppLogo from './AppLogo.vue'

defineProps<{
  collapsed?: boolean
}>()
const emit = defineEmits(['close'])

const route = useRoute()
const router = useRouter()
const { logout, useCurrentUser } = useAuth()

const { data: user, isLoading: isUserLoading } = useCurrentUser()

const menuItems = [
  { label: 'Dashboard', name: 'dashboard', icon: 'pi pi-home' },
  { label: 'Form', name: 'forms-list', icon: 'pi pi-file-edit' },
  { label: 'Reports', name: 'reports', icon: 'pi pi-chart-line' },
  { label: 'Trash', name: 'trash', icon: 'pi pi-trash' },
]

const dropdownOpen = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const isActive = (name: string) => route.name === name

const navigate = (name: string) => {
  router.push({ name })
  if (window.innerWidth < 1024) {
    emit('close')
  }
}

const handleLogout = () => {
  logout.mutate()
  dropdownOpen.value = false
}
</script>

<template>
  <aside class="flex h-screen bg-base border-r border-border flex-col transition-all duration-300 ease-in-out"
    :class="collapsed ? 'w-20' : 'w-64'">
    <header class="h-14 flex justify-between items-center px-4">
      <AppLogo v-if="!collapsed" />
    </header>

    <nav class="flex-1 p-2 space-y-1 overflow-y-auto">
      <button v-for="item in menuItems" :key="item.name" @click="navigate(item.name)"
        class="flex items-center gap-3 w-full px-3 py-2 rounded-md transition duration-200 group relative cursor-pointer"
        :class="[
          isActive(item.name)
            ? 'bg-fg-base-secondary font-medium text-primary'
            : 'hover:bg-fg-base-secondary text-secondary'
        ]">
        <i :class="item.icon" class="text-lg shrink-0 transition-colors" />
        <span v-if="!collapsed" class="text-sm truncate transition-opacity">
          {{ item.label }}
        </span>

        <div v-if="collapsed"
          class="absolute left-full ml-2 hidden group-hover:block bg-gray-800 text-white text-sm px-3 py-1.5 rounded-md whitespace-nowrap z-50 shadow-lg">
          {{ item.label }}
        </div>
      </button>
    </nav>

    <footer class="h-12 flex items-center px-4 border-t border-border">
      <button
        @click="toggleDropdown"
        class="flex items-center justify-between w-full gap-2 hover:bg-fg-base-secondary px-2 py-1 rounded-md transition"
      >
        <div class="flex items-center gap-2">
          <div class="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium">
            <span v-if="isUserLoading || !user">..</span>
            <span v-else>{{ user?.name?.[0]?.toUpperCase() || '?' }}</span>
          </div>
          <span v-if="!collapsed" class="text-sm truncate">
            {{ isUserLoading ? 'Loading...' : user?.name || 'Guest' }}
          </span>
        </div>

        <div class="flex flex-col items-center justify-center gap-0.5">
          <i class="pi pi-chevron-down text-xs"></i>
        </div>
      </button>

      <div
        v-if="dropdownOpen && !collapsed"
        class="absolute bottom-14 w-55 bg-white border border-border py-1 rounded z-50"
      >
        <button
          class="w-full cursor-pointer text-left flex items-center gap-4 px-4 py-2 hover:bg-fg-base-secondary transition"
          @click="handleLogout"
        >
          <i class="pi pi-sign-out text-sm"></i>
          <span class="text-sm">Logout</span>
        </button>
      </div>
    </footer>

  </aside>
</template>
