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
</script>

<template>
  <div class="flex min-h-screen">
    <AppSidebar
      v-if="!isGuestPage"
      :collapsed="collapsed"
      :class="{
        'hidden lg:block': !sidebarOpen && !collapsed,
        'lg:w-20': collapsed,
        'lg:w-64': !collapsed,
        'fixed inset-y-0 left-0 z-50 lg:static lg:z-auto': true,
        'translate-x-0': sidebarOpen || collapsed,
        '-translate-x-full': !sidebarOpen && !collapsed
      }"
      @close="sidebarOpen = false"
    />
    <div
      v-if="sidebarOpen && !collapsed && !isGuestPage"
      class="fixed inset-0 z-40 bg-black/40 lg:hidden"
      @click="sidebarOpen = false"
    />

    <div class="flex flex-1 flex-col">
      <header
        v-if="!isGuestPage"
        class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-base px-4"
      >
        <button
          class="lg:hidden text-secondary hover:text-primary focus:outline-none"
          @click="toggleSidebar"
        >
          <i class="pi pi-bars text-2xl" />
        </button>

        <button
          v-if="sidebarOpen || collapsed"
          class="hidden lg:flex items-center justify-center w-8 h-8 rounded-full hover:bg-fg-base-secondary text-secondary hover:text-primary"
          @click="toggleCollapse"
        >
          <i
            class="pi text-xl transition-transform"
            :class="collapsed ? 'pi-angle-right' : 'pi-angle-left'"
          />
        </button>
        <div class="flex items-center gap-3">
          <!-- Add avatar, notifications, etc. later -->
        </div>
      </header>
      <main class="flex-1 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>
