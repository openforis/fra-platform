import { CSSProperties, PointerEvent, useCallback, useMemo, useRef, useState } from 'react'

type Offset = {
  x: number
  y: number
}

type DragStart = {
  handleRect: DOMRect
  offset: Offset
  pointerX: number
  pointerY: number
}

type HandleProps<Handle extends HTMLElement> = {
  onPointerCancel: (event: PointerEvent<Handle>) => void
  onPointerDown: (event: PointerEvent<Handle>) => void
  onPointerMove: (event: PointerEvent<Handle>) => void
  onPointerUp: (event: PointerEvent<Handle>) => void
}

type Returned<Handle extends HTMLElement> = {
  handleProps: HandleProps<Handle>
  moved: boolean
  reset: () => void
  style: CSSProperties
}

const initialOffset: Offset = { x: 0, y: 0 }

// Move an element by dragging a handle
// spread handleProps on the handle and apply style to the element to move
export const useDraggable = <Handle extends HTMLElement = HTMLDivElement>(): Returned<Handle> => {
  const [offset, setOffset] = useState<Offset>(initialOffset)
  const dragStartRef = useRef<DragStart | null>(null)

  const onPointerDown = useCallback(
    (event: PointerEvent<Handle>) => {
      // Ignore other buttons: only focus on left click
      // event.button.0 = left click
      // event.button.1 = middle click
      // event.button.2 =right click
      if (event.button !== 0) return

      // Presses on buttons inside the handle keep their own click behaviour
      if ((event.target as Element).closest('button')) return

      // Capture the pointer so the handle keeps receiving events when the pointer leaves it
      event.currentTarget.setPointerCapture(event.pointerId)
      const handleRect = event.currentTarget.getBoundingClientRect()
      dragStartRef.current = { handleRect, offset, pointerX: event.clientX, pointerY: event.clientY }
    },
    [offset]
  )

  const onPointerMove = useCallback((event: PointerEvent<Handle>) => {
    const dragStart = dragStartRef.current
    if (!dragStart) return

    const { handleRect, offset: offsetStart, pointerX, pointerY } = dragStart
    const { clientHeight, clientWidth } = document.documentElement

    // Stop when we hit viewport sides
    const deltaX = Math.min(Math.max(event.clientX - pointerX, -handleRect.left), clientWidth - handleRect.right)
    const deltaY = Math.min(Math.max(event.clientY - pointerY, -handleRect.top), clientHeight - handleRect.bottom)
    setOffset({ x: offsetStart.x + deltaX, y: offsetStart.y + deltaY })
  }, [])

  // Pointer capture is released automatically on pointer up and pointer cancel
  const onPointerEnd = useCallback(() => {
    dragStartRef.current = null
  }, [])

  const reset = useCallback(() => {
    setOffset(initialOffset)
  }, [])

  const handleProps = useMemo<HandleProps<Handle>>(
    () => ({ onPointerCancel: onPointerEnd, onPointerDown, onPointerMove, onPointerUp: onPointerEnd }),
    [onPointerDown, onPointerEnd, onPointerMove]
  )

  const style = useMemo<CSSProperties>(() => ({ transform: `translate(${offset.x}px, ${offset.y}px)` }), [offset])

  return { handleProps, moved: offset.x !== 0 || offset.y !== 0, reset, style }
}
