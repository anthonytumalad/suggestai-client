<script setup lang="ts" generic="T extends Record<string, any>">
import { shallowRef, computed, watch } from 'vue'

export interface Column<T> {
  key: keyof T
  label: string
  align?: 'left' | 'center' | 'right'
}

const props = defineProps<{
  columns: Column<T>[]
  rows: T[]
  loading?: boolean
  rowKey?: keyof T
  selectable?: boolean
}>()

const emit = defineEmits<{
  (e: 'rowClick', row: T): void
  (e: 'selectionChange', selected: T[]): void
}>()

const getAlignClass = (align?: Column<T>['align']) => {
  switch (align) {
    case 'center':
      return 'text-center'
    case 'right':
      return 'text-right'
    default:
      return 'text-left'
  }
}

// --- Use shallowRef to avoid reactive proxy wrapping ---
const selectedRows = shallowRef<Set<T>>(new Set())

// Computed array of selected rows
const selectedArray = computed<T[]>(() => Array.from(selectedRows.value))

// Select all checkbox state
const allSelected = computed({
  get: () => props.rows.length > 0 && selectedRows.value.size === props.rows.length,
  set: (val: boolean) => {
    if (val) {
      selectedRows.value = new Set(props.rows)
    } else {
      selectedRows.value.clear()
    }
    emit('selectionChange', selectedArray.value)
  },
})

// Toggle individual row
const toggleRow = (row: T) => {
  if (selectedRows.value.has(row)) {
    selectedRows.value.delete(row)
  } else {
    selectedRows.value.add(row)
  }
  emit('selectionChange', selectedArray.value)
}

// Clear selection if rows change
watch(() => props.rows, () => {
  selectedRows.value.clear()
})
</script>

<template>
  <div class="w-full overflow-x-auto">
    <table class="w-full border-collapse text-sm">
      <!-- Header -->
      <thead class="bg-base border border-border rounded-sm">
        <tr>
          <th v-if="props.selectable" class="px-4 py-3 text-left">
            <input type="checkbox" v-model="allSelected" />
          </th>
          <th v-for="col in columns" :key="String(col.key)" class="text-left px-4 py-3 font-medium text-secondary"
            :class="getAlignClass(col.align)">
            {{ col.label }}
          </th>
        </tr>
      </thead>

      <!-- Body -->
      <tbody>
        <tr v-if="props.loading">
          <td :colspan="props.columns.length + (props.selectable ? 1 : 0)" class="px-4 py-6 text-center text-secondary">
            Loading...
          </td>
        </tr>

        <tr v-else-if="!props.rows.length">
          <td :colspan="props.columns.length + (props.selectable ? 1 : 0)" class="px-4 py-6 text-center text-secondary">
            No data available
          </td>
        </tr>

        <tr v-else v-for="row in props.rows" :key="props.rowKey ? String(row[props.rowKey]) : JSON.stringify(row)"
          class="border-b border-border hover:bg-fg-base-secondary cursor-pointer" @click="$emit('rowClick', row)">

          <!-- Row checkbox -->
          <td v-if="props.selectable" class="px-4 py-3 text-left">
            <input type="checkbox" :checked="selectedRows.has(row)" @click.stop="toggleRow(row)" />
          </td>

          <!-- Cells -->
          <td v-for="col in columns" :key="String(col.key)" class="px-4 py-3" :class="getAlignClass(col.align)">
            <slot :name="`cell-${String(col.key)}`" :row="row" :value="row[col.key]">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
