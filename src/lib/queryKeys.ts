export const queryKeys = {
  user: {
    base: ['user'] as const,
  },
  forms: {
    base: ['forms'] as const,
    list: (page: number, perPage?: number) =>
      ['forms', 'list', page, perPage ?? 10] as const,
  },
} as const
