import { QueryClient, QueryCache, MutationCache } from "@tanstack/vue-query"
import { errorHandler } from "./errorHandler"

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      errorHandler.handle(error)
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      errorHandler.handle(error)
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 1000 * 60 * 5,
    },
  }
})
