const debounceTimeouts = {}
const throttleTimeouts = {}
const throttleLastRan = {}

export const debounce = (func: any, id: any, delay = 500, immediate = false) => {
  return (...args: any[]) => {
    const later = () => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      delete debounceTimeouts[id]
      if (!immediate) {
        func(...args)
      }
    }

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const callNow = immediate && !debounceTimeouts[id]
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    clearTimeout(debounceTimeouts[id])
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      throttleLastRan[id] = Date.now()

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      delete throttleTimeouts[id]
    }

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const lastRun = throttleLastRan[id]
    if (lastRun) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      clearTimeout(throttleTimeouts[id])

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const timeout = throttleTimeouts[id]
  if (timeout) {
    clearTimeout(timeout)
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    delete throttleTimeouts[id]
  }

  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  delete throttleLastRan[id]
}
