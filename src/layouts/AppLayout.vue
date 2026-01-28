<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'

const route = useRoute()

const isGuestPage = computed(() => !!route.meta.guest)
const sidebarOpen = ref(true)
const collapsed = ref(false)

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const routeTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  'forms-list': 'Forms',
  reports: 'Reports',
  trash: 'Trash',
  profile: 'Profile'
}

const currentRouteTitle = computed(() => {
  if (route.name && routeTitles[route.name.toString()]) {
    return routeTitles[route.name.toString()]
  }
  return 'Page'
})
</script>

<template>
  <div class="flex min-h-screen">
    <AppSidebar
      v-if="!isGuestPage"
      :collapsed="collapsed"
      class="fixed top-0 left-0 h-screen z-50 transition-all duration-300"
      :class="collapsed ? 'w-20' : 'w-64'"
      @close="sidebarOpen = false"
    />
    <div
      v-if="sidebarOpen && !collapsed && !isGuestPage"
      class="fixed inset-0 z-40 bg-black/40 lg:hidden"
      @click="sidebarOpen = false"
    />

    <div
      class="flex flex-1 flex-col"
      :class="{'ml-64': !collapsed, 'ml-20': collapsed}"
    >
      <header
        v-if="!isGuestPage"
        class="fixed top-0 w-full z-40 h-14 border-b border-border px-4 flex items-center gap-4 transition-all duration-300"
      >
        <button
          class="lg:hidden text-secondary hover:text-primary focus:outline-none"
          @click="toggleSidebar"
        >
          <i class="pi pi-bars text-2xl" />
        </button>

        <button
          v-if="sidebarOpen || collapsed"
          class="hidden lg:flex items-center cursor-pointer justify-center w-8 h-8 rounded-full hover:bg-fg-base-secondary text-secondary hover:text-fg-base"
          @click="toggleCollapse"
        >
          <i
            class="pi text-xl transition-transform"
            :class="collapsed ? 'pi-angle-right' : 'pi-angle-left'"
          />
        </button>
        <span class="text-[16px] font-medium">
          {{ currentRouteTitle }}
        </span>
      </header>
      <main class="flex-1 overflow-auto mt-14">
        <router-view />
      </main>
    </div>
  </div>
</template>
