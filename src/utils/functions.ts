// eslint-disable-next-line import/no-extraneous-dependencies
import { DebounceSettings } from 'lodash'
// @ts-ignore
import * as _debounce from 'lodash.debounce'
// @ts-ignore
import * as throttle from 'lodash.throttle'

const debounceFunctions: any = {}

const debounce = <T extends (...args: any) => any>(
  func: T,
  wait: number | undefined,
  id: string,
  options?: DebounceSettings
) => {
  if (!debounceFunctions[id]) {
    debounceFunctions[id] = _debounce(func, wait, options)
  }
  return debounceFunctions[id]
}

export const Functions = {
  debounce,
  throttle,
}
