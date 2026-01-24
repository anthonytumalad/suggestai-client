<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: string
  type?: string
  placeholder?: string
  autocomplete?: string
  required?: boolean
  wrapperClass?: string
  inputClass?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const wrapperClass = computed(() => props.wrapperClass ?? 'relative text-sm')

const mergedInputClass = computed(() => {
  const defaultClasses =
    'w-full pl-10 py-1.5 bg-white border border-border rounded transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primary'

  return [defaultClasses, props.inputClass].filter(Boolean).join(' ')
})

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div :class="wrapperClass">
    <slot name="icon"></slot>
    <input
      :type="type"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :class="mergedInputClass"
      :required="required"
      v-bind="$attrs"
    />
  </div>
</template>
