import React, { useMemo } from 'react'

import { Resizable as ReResizable } from 're-resizable'

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
}

type Props = React.PropsWithChildren<ResizableProps>

const Resizable: React.FC<Props> = (props: Props) => {
  const { children, defaultSize, className, maxHeight, minHeight, maxWidth, minWidth } = props

  const enable = useMemo(
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
    <ReResizable
      enable={enable}
      minHeight={minHeight}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      minWidth={minWidth}
      className={className}
      defaultSize={defaultSize}
    >
      {React.Children.toArray(children)}
    </ReResizable>
  )
}

Resizable.defaultProps = {
  className: undefined,
  maxHeight: undefined,
  minHeight: undefined,
  maxWidth: undefined,
  minWidth: undefined,
  defaultSize: undefined,
}

export default Resizable
