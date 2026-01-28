<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, computed, watch, shallowRef } from 'vue'

export interface TableColumn<T> {
  field: keyof T
  header: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  format?: (value: T[keyof T]) => string
}

defineOptions({ name: 'DataTable' })

const props = withDefaults(defineProps<{
  columns: TableColumn<T>[]
  items: T[]
  loading?: boolean
  rowKey?: keyof T | ((item: T) => string | number)
  pageSize?: number
  pagination?: boolean
}>(), {
  loading: false,
  pageSize: 10,
  pagination: true,
  rowKey: 'id' as keyof T
})

const emit = defineEmits<{
  (e: 'row-click', item: T): void
  (e: 'selection-change', selected: T[]): void
}>()

const currentPage = ref(1)
const sortField = ref<keyof T | null>(null)
const sortDirection = ref<'asc' | 'desc'>('asc')
const selectedItems = shallowRef<T[]>([])
// ────────────────────────────────────────────────
// Computed
// ────────────────────────────────────────────────

const sortedItems = computed(() => {
  if (!sortField.value) return props.items

  return [...props.items].sort((a, b) => {
    const aVal = a[sortField.value!]
    const bVal = b[sortField.value!]

    if (aVal === bVal) return 0
    if (aVal == null) return 1
    if (bVal == null) return -1

    return sortDirection.value === 'asc'
      ? aVal < bVal ? -1 : 1
      : aVal > bVal ? -1 : 1
  })
})

const paginatedData = computed(() => {
  if (!props.pagination) return sortedItems.value

  const start = (currentPage.value - 1) * props.pageSize
  return sortedItems.value.slice(start, start + props.pageSize)
})

const totalPages = computed(() => {
  return Math.ceil(props.items.length / props.pageSize)
})

const startIndex = computed(() => (currentPage.value - 1) * props.pageSize)

const pageNumbers = computed(() => {
  const pages: number[] = []
  const maxPages = 7
  let start = Math.max(1, currentPage.value - 3)
  const end = Math.min(totalPages.value, start + maxPages - 1)

  if (end - start + 1 < maxPages) {
    start = Math.max(1, end - maxPages + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const showPagination = computed(() => props.pagination && props.items.length > props.pageSize)

// ────────────────────────────────────────────────
// Methods
// ────────────────────────────────────────────────

const toggleSort = (field: keyof T) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
  currentPage.value = 1
}

const getRowKey = (item: T): string | number => {
  if (typeof props.rowKey === 'function') return props.rowKey(item)
  return String(item[props.rowKey as keyof T] ?? Math.random())
}

const formatValue = <K extends keyof T>(
  value: T[K],
  col: TableColumn<T>
) => {
  if (col.format) return col.format(value)
  if (value == null) return '—'
  if (typeof value === 'number') return value.toLocaleString()
  return String(value)
}

const handleRowClick = (item: T) => {
  emit('row-click', item)
}

watch(() => props.items.length, () => {
  currentPage.value = 1
})
</script>

<template>
  <div class="w-full overflow-x-auto rounded">
    <table class="w-full min-w-max">
      <!-- Header -->
      <thead class="bg-base border border-border">
        <tr>
          <th v-for="col in columns" :key="String(col.field)"
            class="px-4 py-3 text-left text-sm text-secondary tracking-wider" :class="[
              col.align === 'center' && 'text-center',
              col.align === 'right' && 'text-right',
              col.sortable && 'cursor-pointer select-none hover:bg-fg-base-secondary'
            ]" @click="col.sortable ? toggleSort(col.field) : null">
            <div class="flex items-center gap-1 justify-between">
              <span>{{ col.header }}</span>
              <span v-if="col.sortable" class="text-secondary">
                <i v-if="sortField === col.field" :class="sortDirection === 'asc'
                  ? 'pi pi-sort-amount-up'
                  : 'pi pi-sort-amount-down'" />
                <i v-else class="pi pi-sort" />
              </span>
            </div>
          </th>
        </tr>

        <!-- Loading progress bar -->
        <tr v-if="loading">
          <th :colspan="columns.length" class="p-0">
            <div class="h-0.5 w-full overflow-hidden bg-base">
              <div class="h-full bg-primary animate-loading-bar"></div>
            </div>
          </th>
        </tr>
      </thead>

      <!-- Body -->
      <tbody class="bg-white ">
        <tr v-if="paginatedData.length === 0 && !loading">
          <td :colspan="columns.length" class="px-6 py-10 text-center text-secondary border-b border-border">
            No records found
          </td>
        </tr>

        <tr v-for="item in paginatedData" :key="getRowKey(item)" class="hover:bg-base transition-colors border-b border-border"
          :class="{ 'bg-blue-50': selectedItems.includes(item) }" @click="handleRowClick(item)">
          <td v-for="col in columns" :key="String(col.field)" class="px-4 py-3 text-sm whitespace-nowrap">
            <slot :name="`cell-${String(col.field)}`" :row="item" :value="item[col.field]" :column="col">
              {{ formatValue(item[col.field], col) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div
      v-if="showPagination"
      class="px-4 py-3 flex items-center justify-between text-sm text-secondary"
    >
      <div class="">
        Showing {{ startIndex + 1 }}–{{ Math.min(startIndex + pageSize, items.length) }} of {{ items.length }}
      </div>

      <div class="flex gap-1">
        <button
          :disabled="currentPage === 1"
          @click="currentPage = 1"
          class="px-3 py-1 border border-border rounded hover:bg-base cursor-pointer disabled:opacity-50"
        >
          First
        </button>
        <button
          :disabled="currentPage === 1"
          @click="currentPage--"
          class="px-3 py-1 border border-border rounded hover:bg-base cursor-pointer disabled:opacity-50"
        >
          Prev
        </button>

        <button
          v-for="page in pageNumbers"
          :key="page" :class="[
          'px-3 cursor-pointer py-1 border border-border rounded min-w-8',
            page === currentPage ? 'bg-primary text-white' : 'hover:bg-base'
          ]"
          @click="currentPage = page"
        >
          {{ page }}
        </button>

        <button :disabled="currentPage === totalPages" @click="currentPage++"
          class="px-3 py-1 border border-border rounded hover:bg-base cursor-pointer disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  </div>
</template>
