import { useEffect } from 'react'

export default (callback: any, elementRef: any) => {
  useEffect(() => {
    // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'ResizeObserver'. Did you mean 'r... Remove this comment to see the full error message
    const resizeObserver = new ResizeObserver(callback)
    resizeObserver.observe(elementRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])
}
