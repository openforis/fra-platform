import { useEffect, useRef, useState } from 'react'

// document height - toolbar
const baseHeight = `100dvh - 50px`

export const useMaxHeight = (): string => {
  const [maxHeight, setMaxHeight] = useState<string>(`calc(${baseHeight})`)
  const heightsRef = useRef<Record<string, number>>({})

  useEffect(() => {
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
  }, [])

  return maxHeight
}
