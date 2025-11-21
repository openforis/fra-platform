import { useCallback, useEffect, useState } from 'react'

type Props = {
  opened: boolean
}

type Returned = {
  active: boolean
  displayChildren: boolean
  onTransitionEnd: (e: React.TransitionEvent) => void
}

export const useSlidingPanelMount = (props: Props): Returned => {
  const { opened } = props

  const [active, setActive] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(false)

  useEffect(() => {
    if (opened) {
      setDisplayChildren(true)
    } else {
      setActive(false)
    }
  }, [opened])

  useEffect(() => {
    if (displayChildren && opened) {
      requestAnimationFrame(() => {
        setActive(true)
      })
    }
  }, [displayChildren, opened])

  const onTransitionEnd = useCallback<Returned['onTransitionEnd']>(
    (e) => {
      if (e.target !== e.currentTarget) return

      if (!opened) {
        setDisplayChildren(false)
      }
    },
    [opened]
  )

  return {
    active,
    displayChildren,
    onTransitionEnd,
  }
}
