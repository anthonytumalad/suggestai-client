<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  modelValue?: { start: Date | null; end: Date | null }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: { start: Date | null; end: Date | null }): void
  (e: 'filter-change', value: { start: Date | null; end: Date | null }): void
}>()

type FilterType = 'today' | 'week' | 'custom'

const filterOptions: { label: string; value: FilterType }[] = [
  { label: 'Today', value: 'today' },
  { label: 'Last 7 days', value: 'week' },
  { label: 'Custom', value: 'custom' },
]

const selectedFilter = ref<FilterType>('today')
const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)

// Sync with v-model
watch(() => ({ start: startDate.value, end: endDate.value }), (val) => {
  emit('update:modelValue', val)
  emit('filter-change', val)
}, { deep: true })

// Initialize from parent
watch(() => props.modelValue, (val) => {
  if (val) {
    startDate.value = val.start
    endDate.value = val.end
  }
}, { immediate: true, deep: true })

// Week: Monday–Sunday
const currentWeek = computed(() => {
  if (!startDate.value) return { start: null, end: null }
  const d = new Date(startDate.value)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  const mon = new Date(d)
  const sun = new Date(d)
  sun.setDate(sun.getDate() + 6)
  return { start: mon, end: sun }
})

// Auto-set ranges when mode changes
watch(selectedFilter, (mode) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (!startDate.value) {
    startDate.value = today
  }

  if (mode === 'today') {
    endDate.value = new Date(startDate.value!)
  }
  else if (mode === 'week') {
    const w = currentWeek.value
    if (w.start && w.end) {
      startDate.value = w.start
      endDate.value = w.end
    }
  }
  // custom → no auto adjustment
})


// Format helpers
const formatDate = (d: Date | null) => d ? d.toISOString().split('T')[0] : ''
const parseDate = (s: string) => s ? new Date(s) : null

// For display in readonly mode
const displayDay = computed(() => startDate.value ? startDate.value.toLocaleDateString('en-US', {
  weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'
}) : '')

const displayWeek = computed(() => {
  const w = currentWeek.value
  if (!w.start || !w.end) return ''
  return `${w.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${w.end.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: w.end.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
  })}`
})
</script>

<template>
  <div class="date-range-picker flex items-center space-x-2">

    <!-- Mode selector + smart label -->
    <div class="flex items-center gap-3">
      <select v-model="selectedFilter"
        class="border border-border rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer">
        <option v-for="opt in filterOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>

    <!-- DAY mode – readonly display -->
    <div v-if="selectedFilter === 'today'"
      class="border border-border rounded px-3 py-1.5 text-sm bg-base">
      {{ displayDay || '—' }}
    </div>

    <!-- WEEK mode – readonly range display -->
    <div v-else-if="selectedFilter === 'week'"
      class="border border-border rounded px-3 py-1.5 text-sm bg-base">
      {{ displayWeek || '—' }}
    </div>

    <!-- CUSTOM mode – editable -->
    <div v-else class="flex items-center gap-2 rounded border border-border bg-white px-3 py-1">
      <input type="date" class="border-none outline-none text-sm w-32" :value="formatDate(startDate)"
        @input="startDate = parseDate(($event.target as HTMLInputElement).value)" />
      <span class="text-secondary">→</span>
      <input type="date" class="border-none outline-none text-sm w-32" :value="formatDate(endDate)"
        @input="endDate = parseDate(($event.target as HTMLInputElement).value)" />
    </div>

  </div>
</template>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.7;
}

input[type="date"]:focus {
  outline: none;
}

select:focus {
  outline: none;
}
</style>
