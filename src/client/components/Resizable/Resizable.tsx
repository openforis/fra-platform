import React, { useMemo } from 'react'
import { Props as RndProps, Rnd, RndDragCallback, RndResizeCallback } from 'react-rnd'

type ResizableProps = {
  // bonds: selector for the element the box must stay inside of
  bounds?: string
  className?: string
  // dragHandleClassName: makes the element draggable
  dragHandleClassName?: string
  maxHeight?: number | string
  minHeight?: number | string
  maxWidth?: number | string
  minWidth?: number | string
  onDragStop?: RndDragCallback
  onResize?: RndResizeCallback
  onResizeStop?: RndResizeCallback
  position: RndProps['position']
  size: RndProps['size']
  style?: React.CSSProperties
}

type Props = React.PropsWithChildren<ResizableProps>

const Resizable: React.FC<Props> = (props: Props) => {
  const {
    bounds,
    children,
    className,
    dragHandleClassName,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    onDragStop,
    onResize,
    onResizeStop,
    position,
    size,
    style,
  } = props

  const enableResizing = useMemo(
    () => ({
      bottom: false,
      bottomLeft: false,
      bottomRight: false,
      left: true,
      right: true,
      top: true,
      topLeft: true,
      topRight: true,
    }),
    []
  )

  return (
    <Rnd
      bounds={bounds}
      cancel="button"
      className={className}
      disableDragging={!dragHandleClassName}
      dragHandleClassName={dragHandleClassName}
      enableResizing={enableResizing}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      minHeight={minHeight}
      minWidth={minWidth}
      onDragStop={onDragStop}
      onResize={onResize}
      onResizeStop={onResizeStop}
      position={position}
      size={size}
      style={style}
    >
      {React.Children.toArray(children)}
    </Rnd>
  )
}

export default Resizable
