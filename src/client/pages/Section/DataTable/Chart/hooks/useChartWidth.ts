import { RefObject, useLayoutEffect, useState } from 'react'

import { Functions } from 'utils/functions'

import { useIsPrintRoute } from 'client/hooks/routes'

const printWidth = 960

export const useChartWidth = (props: { containerRef: RefObject<HTMLDivElement> }): number | undefined => {
  const { containerRef } = props
  const { print } = useIsPrintRoute()

  const [width, setWidth] = useState<number>(print ? printWidth : undefined)

  useLayoutEffect(() => {
    if (!print) {
      const updateWidth = Functions.throttle(
        (entry: ResizeObserverEntry): void => {
          setWidth(entry.contentRect.width)
        },
        250,
        { leading: true, trailing: true }
      )

      const resizeObserver = new ResizeObserver((entries) => {
        updateWidth(entries.at(0))
      })

      resizeObserver.observe(containerRef.current.parentElement)

      return () => {
        resizeObserver.disconnect()
      }
    }

    return undefined
  }, [containerRef, print])

  return width
}
