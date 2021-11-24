import ResizeObserver from '../utils/polyfill/resizeObserver'
import { useEffect } from 'react'

export default (callback: any, elementRef: any) => {
  useEffect(() => {
    const resizeObserver = new ResizeObserver(callback)
    resizeObserver.observe(elementRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])
}
