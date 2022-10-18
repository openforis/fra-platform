// @ts-ignore
import * as throttle from 'lodash.throttle'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounceTimeouts: any = {}

export const debounce =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any


    (func: any, id: string | number, delay = 500, immediate = false): any =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]) => {
      const later = () => {
        delete debounceTimeouts[id]
        if (!immediate) {
          func.apply(this, args)
        }
      }

      const callNow = immediate && !debounceTimeouts[id]
      clearTimeout(debounceTimeouts[id])
      debounceTimeouts[id] = setTimeout(later, delay)
      if (callNow) {
        func.apply(this, args)
      }
    }

export const Functions = {
  debounce,
  throttle,
}
