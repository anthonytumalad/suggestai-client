import { useQuery, keepPreviousData, type UseQueryOptions } from '@tanstack/vue-query'
import { type Ref, computed } from 'vue'

export function createPaginatedListQuery<TData, TError = Error>(
  getKey: (page: number, perPage: number) => readonly unknown[],
  fetchFn: (page: number, perPage: number) => Promise<TData>,
  defaultOptions: Partial<UseQueryOptions<TData, TError>> = {},
) {
  return (page: Ref<number>, perPage: Ref<number>) => {
    return useQuery<TData, TError>({
      queryKey: computed(() => getKey(page.value, perPage.value)),
      queryFn: () => fetchFn(page.value, perPage.value),
      staleTime: 3 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      placeholderData: keepPreviousData,
      ...defaultOptions,
    })
  }
}

export function createSingletonQuery<TData, TError = Error>(
  key: readonly unknown[],
  fetchFn: () => Promise<TData>,
  enabled: Ref<boolean> | boolean | (() => boolean),
  defaultOptions: Partial<UseQueryOptions<TData, TError>> = {},
) {
  return useQuery<TData, TError>({
    queryKey: key,
    queryFn: fetchFn,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled,
    retry: false,
    ...defaultOptions,
  })
}
