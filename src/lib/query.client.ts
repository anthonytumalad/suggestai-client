import { QueryClient, QueryCache, MutationCache } from "@tanstack/vue-query"
import { ErrorHandler } from "./error.handler"

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      ErrorHandler.handle(error)
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      ErrorHandler.handle(error)
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 1000 * 60 * 5,
    },
  }
})
