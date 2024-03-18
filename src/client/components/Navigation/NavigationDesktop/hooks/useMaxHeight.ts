import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { Breakpoints } from 'client/utils'

// document height - toolbar
const baseHeight = `100dvh - 50px`

export const useMaxHeight = (): string => {
  const laptop = useMediaQuery({ minWidth: Breakpoints.laptop })
  const [maxHeight, setMaxHeight] = useState<string>(laptop ? 'unset' : `calc(${baseHeight})`)
  const heightsRef = useRef<Record<string, number>>({})

  useEffect(() => {
    if (laptop) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            heightsRef.current[entry.target.tagName] = entry.intersectionRect.height
          })

          const heightsCalc = Object.values(heightsRef.current)
            .map((v) => `${v}px`)
            .join(' - ')

          setMaxHeight(`calc(100dvh - 50px - ${heightsCalc})`)
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
      )

      observer.observe(document.getElementsByTagName('header')[0])
      observer.observe(document.getElementsByTagName('footer')[0])

      return () => {
        observer.disconnect()
      }
    }

    setMaxHeight('unset')
    return undefined
  }, [laptop])

  return maxHeight
}
