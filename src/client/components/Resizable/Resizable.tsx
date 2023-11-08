import React from 'react'

import { Resizable as ReResizable } from 're-resizable'

type ResizableProps = {
  className?: string
  maxWidth?: number | string
  minWidth?: number | string
}

type Props = React.PropsWithChildren<ResizableProps>

const Resizable: React.FC<Props> = (props: Props) => {
  const { children, className, maxWidth, minWidth } = props

  return (
    <ReResizable maxWidth={maxWidth} minWidth={minWidth} className={className}>
      {children}
    </ReResizable>
  )
}

Resizable.defaultProps = {
  className: undefined,
  maxWidth: undefined,
  minWidth: undefined,
}

export default Resizable
