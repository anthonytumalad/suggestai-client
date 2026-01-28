<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'AppButton'
})

const props = withDefaults(defineProps<{
  label?: string
  icon?: string
  iconRight?: string
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outline' | 'text' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  iconSize?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), {
  variant: 'primary',
  size: 'md',
  iconSize: 'md',
  type: 'button',
  loading: false,
  disabled: false,
  fullWidth: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (e: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', e)
}

const sizeClasses = computed(() => {
  return {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }[props.size]
})

const iconSizeClasses = computed(() => {
  return {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }[props.iconSize]
})


const variantClasses = computed(() => {
  const variants = {
    primary: `
      bg-primary text-white
      hover:opacity-80
    `,
    secondary: `
      bg-gray-200 text-gray-800
      hover:bg-gray-300
      focus:ring-gray-400
    `,
    success: `
      bg-green-600 text-white
      hover:bg-green-700
      focus:ring-green-500
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700
      focus:ring-red-500
    `,
    warning: `
      bg-yellow-500 text-black
      hover:bg-yellow-600
      focus:ring-yellow-400
    `,
    info: `
      bg-blue-600 text-white
      hover:bg-blue-700
      focus:ring-blue-500
    `,
    outline: `
      border border-gray-300 bg-transparent text-gray-700
      hover:bg-gray-50
      focus:ring-gray-400
    `,
    text: `
      bg-transparent text-gray-700
      hover:bg-gray-100
      focus:ring-gray-400
    `,
    ghost: `
      bg-transparent text-gray-700
      hover:bg-gray-100/70
      focus:ring-gray-400
    `
  }

  return variants[props.variant] || variants.primary
})
</script>

<template>
  <button :type="type" :disabled="disabled || loading" :class="[
    'inline-flex items-center justify-center gap-2',
    'rounded transition-all duration-300',
    'cursor-pointer',
    sizeClasses,
    variantClasses,
    (disabled || loading) && 'opacity-60 cursor-not-allowed',
    fullWidth && 'w-full'
  ]" @click="handleClick">
    <span v-if="icon && !loading" class="icon">
      <i :class="[icon, iconSizeClasses]"></i>
    </span>

    <span v-if="loading" class="animate-spin">
      <i class="pi pi-spinner" :class="iconSizeClasses"></i>
    </span>

    <span>{{ label || $slots.default?.() }}</span>

    <span v-if="iconRight && !loading" class="icon">
      <i :class="[iconRight, iconSizeClasses]"></i>
    </span>
  </button>
</template>

<style scoped>
:deep(.pi) {
  line-height: 1;
  vertical-align: middle;
}

.icon {
  @apply flex items-center justify-center;
  margin-left: -0.125rem;
  margin-right: -0.125rem;
}
</style>
