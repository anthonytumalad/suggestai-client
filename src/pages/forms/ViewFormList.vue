<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFormsList } from '@/composables/forms/useFormsList'
import type { TableColumn } from '@/components/ui/table/AppTable.vue'



const { useFormsList } = useForms()

const currentPage = ref(1)
const pageSize = ref(10)

const {
  data: queryData,
  isLoading,
  isFetching,
  isError,
  error
} =     useFormsList
(currentPage.value, pageSize.value)

const forms = computed<FormItem[]>(() => {
  return (queryData.value?.data ?? []).map(form => ({
    id: form.id,
    title: form.title,
    suggestions_count: form.suggestions_count ?? 0,
    is_active: form.is_active
  }))
})


const columns: TableColumn<FormItem>[] = [
  { field: 'id', header: 'ID', sortable: true },
  { field: 'title', header: 'Name', sortable: true },
  {
    field: 'suggestions_count',
    header: 'Total Suggestions',
    align: 'right',
    sortable: true,
    format: (v) => {
      if (typeof v !== 'number' || v === 0) return '—'
      return v.toLocaleString('en-PH')
    }
  },
  {
    field: 'is_active',
    header: 'Active',
    align: 'center',
    format: (v: boolean) => (v ? 'Active' : 'Inactive'),
  },
]
</script>

<template>
  <div class="flex flex-col space-y-4">
    <div class="flex items-center justify-between">
      <AppInput placeholder="Search" type="text">
        <template #icon>
          <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-border"></i>
        </template>
      </AppInput>
      <AppButton label="New form" icon="pi pi-plus" variant="primary" size="sm" iconSize="sm" />
    </div>
    <AppTable
      :columns="columns"
      :items="forms"
      :loading="isLoading || isFetching"
      :error="isError ? (error?.message || 'Failed to load forms'): null"
      pagination
      :page-size="7"
    />
  </div>
</template>
