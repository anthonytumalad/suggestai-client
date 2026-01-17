<template>
  <header class="fixed w-full h-16 flex items-center px-14">
    <div class="flex justify-between w-full items-center">
      <div class="flex items-center space-x-10">
        <img src="../assets/img/logo.png" alt="Logo" class="w-10 h-10">
        <div class="flex items-center space-x-10">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-2 text-sm transition-colors"
            :class="isActive(link.to) ? 'text-primary font-medium' : 'text-fg-base hover:text-primary'"
          >
            <span>{{ link.title }}</span>
          </RouterLink>
        </div>
      </div>
      <div class="relative">
        <button
          class="rounded-full focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          @click="toggleMenu"
        >
          <UserAvatar :user="user" size="md" />
        </button>
        <transition
          enter-active-class="transition ease-out duration-150"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isOpen"
            class="absolute right-0 mt-3 w-48 rounded bg-white border border-border z-50"
          >
            <div class="px-4 py-3 border-b border-border">
              <p class="text-sm text-fg-base">
                {{ user?.name ?? 'Guest' }}
              </p>
              <p class="text-xs text-secondary truncate">
                {{ user?.email }}
              </p>
            </div>

            <div class="py-1">
              <RouterLink
                to="/profile"
                class="block px-4 py-2 text-sm hover:bg-mb-base transition"
                @click="closeMenu"
              >
                Profile
              </RouterLink>

              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2 text-sm hover:bg-mb-base transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { UseAuth } from '@/composables/mutations/use.auth'
import UserAvatar from './ui/avatar/UserAvatar.vue'

interface NavLinkProps {
  to: string
  title: string
}

const { useUserQuery, logout } = UseAuth()
const { data: user } = useUserQuery()

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const onClickOutside = (event: MouseEvent) => {
  if (!(event.target as HTMLElement).closest('.relative')) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})

const navLinks: NavLinkProps[] = [
  { to: '/dashboard', title: 'Dashboard' },
  { to: '/form', title: 'Form' },
  { to: '/mail', title: 'Mail' },
  { to: '/student', title: 'Student' },
  { to: '/student', title: 'Trash' },
]

const handleLogout = () => {
  logout.mutate()
}

const route = useRoute()
const isActive = (to: string) => to && route.path.startsWith(to)
</script>
