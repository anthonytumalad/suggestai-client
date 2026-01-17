<template>
  <div
    class="flex items-center justify-center rounded-full
           text-xs font-semibold text-white select-none"
    :class="[sizeClass, avatarColor]"
  >
    {{ initials }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { User } from '@/types/auth.types'

interface Props {
  user?: User | null
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const initials = computed(() => {
  if (!props.user?.name) return 'G'

  return props.user.name
    .split(' ')
    .filter(Boolean)
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

const COLORS = [
  'bg-red-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-yellow-500',
  'bg-lime-500',
  'bg-green-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-sky-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-purple-500',
  'bg-fuchsia-500',
  'bg-pink-500',
  'bg-rose-500',
]

const avatarColor = computed(() => {
  if (!props.user) return 'bg-gray-400'
  return COLORS[props.user.id % COLORS.length]
})

const sizeClass = computed(() => {
  return {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
  }[props.size]
})
</script>
