import React, { useMemo } from 'react'
import { Resizable as ReResizable, ResizeCallback } from 're-resizable'

type ResizableProps = {
  className?: string
  defaultSize?: {
    width: number | string
    height: number | string
  }
  maxHeight?: number | string
  minHeight?: number | string
  maxWidth?: number | string
  minWidth?: number | string
  onResize?: ResizeCallback
  vertical?: boolean
}

type Props = React.PropsWithChildren<ResizableProps>

const Resizable: React.FC<Props> = (props: Props) => {
  const {
    children,
    className,
    defaultSize,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    onResize,
    vertical = true,
  } = props

  const enable = useMemo(
    () => ({
      bottom: false,
      bottomLeft: false,
      bottomRight: false,
      left: true,
      right: true,
      top: vertical,
      topLeft: vertical,
      topRight: vertical,
    }),
    [vertical]
  )

  return (
    <ReResizable
      className={className}
      defaultSize={defaultSize}
      enable={enable}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      minHeight={minHeight}
      minWidth={minWidth}
      onResize={onResize}
    >
      {React.Children.toArray(children)}
    </ReResizable>
  )
}

export default Resizable
