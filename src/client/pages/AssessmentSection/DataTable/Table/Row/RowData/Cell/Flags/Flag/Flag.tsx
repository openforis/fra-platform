import './Flag.scss'
import React, { PropsWithChildren } from 'react'

import { TooltipId } from 'meta/tooltip'

type Props = {
  tooltipContent?: string
  tooltipId?: TooltipId
}

const Flag: React.FC<PropsWithChildren<Props>> = (props) => {
  const { children, tooltipContent, tooltipId } = props

  return (
    <div className="data-cell__flag no-csv" data-tooltip-id={tooltipId} data-tooltip-html={tooltipContent}>
      {React.Children.toArray(children)}
    </div>
  )
}

Flag.defaultProps = {
  tooltipContent: undefined,
  tooltipId: undefined,
}

export default Flag
