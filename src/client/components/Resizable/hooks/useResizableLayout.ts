import { useCallback, useState } from 'react'
import { Props as RndProps, RndDragCallback, RndResizeCallback } from 'react-rnd'

type Props = {
  position: RndProps['position']
  size: RndProps['size']
}

type Returned = Props & {
  moved: boolean
  onDragStop: RndDragCallback
  onResizeStop: RndResizeCallback
  reset: () => void
}

// Position and size of a Resizable component
export const useResizableLayout = (props: Props): Returned => {
  // undefined while the box is at its default position and size
  const [layout, setLayout] = useState<Props | undefined>(undefined)

  const { position, size } = layout ?? props

  const onDragStop = useCallback<RndDragCallback>(
    (_event, data) => {
      // don't update on clicks, only on drag
      if (data.x === position.x && data.y === position.y) return

      setLayout({ position: { x: data.x, y: data.y }, size })
    },
    [position, size]
  )

  const onResizeStop = useCallback<RndResizeCallback>((_event, _direction, element, _delta, positionResized) => {
    const { height, width } = element.style
    setLayout({ position: positionResized, size: { height, width } })
  }, [])

  const reset = useCallback(() => {
    setLayout(undefined)
  }, [])

  return { moved: Boolean(layout), onDragStop, onResizeStop, position, reset, size }
}
