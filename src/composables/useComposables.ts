import { getCurrentInstance } from 'vue'

export function useComposables() {
  const instance = getCurrentInstance()
  if (!instance?.proxy) {
    throw new Error('useComposables must be used inside setup()')
  }
  return instance.proxy.$composables
}
