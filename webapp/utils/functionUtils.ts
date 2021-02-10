const debounceTimeouts: any = {}
const throttleTimeouts: any = {}
const throttleLastRan: any = {}

export const debounce = (func: any, id: any, delay = 500, immediate = false) => {
  return (...args: any[]) => {
    const later = () => {
      delete debounceTimeouts[id]
      if (!immediate) {
        func(...args)
      }
    }

    const callNow = immediate && !debounceTimeouts[id]
    clearTimeout(debounceTimeouts[id])
    debounceTimeouts[id] = setTimeout(later, delay)
    if (callNow) {
      func(...args)
    }
  }
}

export const throttle = (func: any, id: any, limit = 500) => {
  return (...args: any[]) => {
    const runFunction = () => {
      func(...args)
      throttleLastRan[id] = Date.now()

      delete throttleTimeouts[id]
    }

    const lastRun = throttleLastRan[id]
    if (lastRun) {
      clearTimeout(throttleTimeouts[id])

      throttleTimeouts[id] = setTimeout(() => {
        if (Date.now() - lastRun >= limit) {
          runFunction()
        }
      }, limit - (Date.now() - lastRun))
    } else {
      runFunction()
    }
  }
}

export const cancelThrottle = (id: any) => {
  const timeout = throttleTimeouts[id]
  if (timeout) {
    clearTimeout(timeout)
    delete throttleTimeouts[id]
  }

  delete throttleLastRan[id]
}
