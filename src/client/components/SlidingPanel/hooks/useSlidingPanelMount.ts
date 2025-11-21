import { useEffect, useState } from 'react'

type Props = {
  opened: boolean
}

type Returned = {
  isMounted: boolean
  isExpanded: boolean
}

export const useSlidingPanelMount = (props: Props): Returned => {
  const { opened } = props
  const [isMounted, setIsMounted] = useState(opened)
  const [isExpanded, setIsExpanded] = useState(opened)

  useEffect(() => {
    if (opened) {
      setIsMounted(true)
      let frameId: number | null = null
      let openFrameId: number | null = null

      frameId = window.requestAnimationFrame(() => {
        // Set expanded in a second frame to trigger open animation/transition
        openFrameId = window.requestAnimationFrame(() => setIsExpanded(true))
      })

      return (): void => {
        if (frameId !== null) window.cancelAnimationFrame(frameId)
        if (openFrameId !== null) window.cancelAnimationFrame(openFrameId)
      }
    }

    setIsExpanded(false)
    // Unmount after 500ms to allow animation/transition to finish
    const timeout = window.setTimeout(() => setIsMounted(false), 500)
    return (): void => window.clearTimeout(timeout)
  }, [opened])

  return { isExpanded, isMounted }
}
