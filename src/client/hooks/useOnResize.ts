import { useEffect } from 'react'

export const useOnResize = (callback: any, elementRef: any) => {
  useEffect(() => {
    const resizeObserver = new ResizeObserver(callback)
    resizeObserver.observe(elementRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])
}
