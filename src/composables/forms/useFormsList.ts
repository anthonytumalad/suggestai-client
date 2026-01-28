import { ref, computed } from 'vue'
import { createPaginatedListQuery } from "../_queryHelpers"
import { queryKeys } from "@/lib/queryKeys"
import { formsService } from "@/server/services/formsService"
import type { FormListResponse, FormListItem, Form } from "@/types/types"

const useFormsListRaw = createPaginatedListQuery<FormListResponse>(
  (page: number, perPage: number) => queryKeys.forms.list(page, perPage),
  (page: number, perPage: number) => formsService.index(page, perPage)
)

export function useFormsList(initialPage = 1, initialPerPage = 10) {
  const page    = ref(initialPage)
  const perPage = ref(initialPerPage)

  const query = useFormsListRaw(page, perPage)

  const forms = computed<FormListItem[]>(() =>
    query.data.value?.data?.map((form: Form) => ({
      id: form.id,
      title: form.title,
      suggestions_count: form.suggestions_count ?? 0,
      is_active: form.is_active,
    })) ?? []
  )

  const total = computed(() => query.data.value?.meta?.total ?? 0)

  return {
    ...query,
    forms,
    total,
    page,
    perPage,
  }
}
