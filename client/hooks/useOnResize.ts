import { useEffect } from 'react'

// import ResizeObserver from '@client/utils/polyfill/resizeObserver'

export const useOnResize = (callback: any, elementRef: any) => {
  useEffect(() => {
    const resizeObserver = new ResizeObserver(callback)
    resizeObserver.observe(elementRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])
}
