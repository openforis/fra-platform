/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import * as throttle from 'lodash.throttle'

const debounceTimeouts: any = {}

export const debounce =
  (func: any, id: any, delay = 500, immediate = false): any =>
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
