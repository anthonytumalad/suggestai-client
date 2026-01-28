import type { Composables } from '@/plugins/composables'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $composables: Composables
  }
}

export {}
