import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { useIsGeoRoute } from 'client/hooks'
import { Breakpoints } from 'client/utils'

// document height - toolbar
const baseHeight = `100dvh - 50px`

type Returned = {
  maxHeight: string
  top: string
}

export const useMaxHeight = (): Returned => {
  const laptop = useMediaQuery({ minWidth: Breakpoints.laptop })
  const geoRoute = useIsGeoRoute()
  const [maxHeight, setMaxHeight] = useState<Returned>({
    maxHeight: laptop ? 'unset' : `calc(${baseHeight})`,
    top: '0',
  })
  const heightsRef = useRef<Record<string, number>>({})
  const topRep = useRef<number>(0)

  useEffect(() => {
    if (laptop) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const { boundingClientRect, intersectionRect, target } = entry
            heightsRef.current[target.tagName] = intersectionRect.height
            if (target.tagName === 'HEADER') {
              topRep.current = Math.max(boundingClientRect.height - intersectionRect.height - 16, 0)
            }
          })

          const heightsCalc = Object.values(heightsRef.current)
            .map((v) => `${v}px`)
            .join(' - ')

          setMaxHeight({
            maxHeight: `calc(100dvh - 50px - ${heightsCalc}${geoRoute ? ` - 32px` : ''})`,
            top: `${topRep.current}px`,
          })
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
      )

      observer.observe(document.getElementsByTagName('header')[0])
      observer.observe(document.getElementsByTagName('footer')[0])

      return () => {
        observer.disconnect()
      }
    }

    setMaxHeight({ maxHeight: 'unset', top: '0' })

    return undefined
  }, [geoRoute, laptop])

  return maxHeight
}
