<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tabs = [
  { label: 'List', name: 'forms-list' },
  { label: 'Summary', name: 'forms-summary' },
]

const selectTab = (tabName: string) => {
  if (route.name !== tabName) {
    router.push({ name: tabName })
  }
}

const isActive = (tabName: string) => route.name === tabName
</script>

<template>
  <div class="py-4.5">
    <div class="flex border-b border-border px-6">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        @click="selectTab(tab.name)"
        class="cursor-pointer px-4 py-2 -mb-px text-sm border-b-2 transition" :class="isActive(tab.name)
          ? 'border-primary text-primary'
          : 'border-transparent text-secondary hover:text-fg-base hover:border-border'"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="mt-4 p-6">
      <router-view />
    </div>
  </div>
</template>
