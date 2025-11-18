import './Flag.scss'
import React, { PropsWithChildren } from 'react'

import { TooltipId } from 'meta/tooltip/id'

type Props = {
  tooltipContent?: string
  tooltipId?: TooltipId
}

const Flag: React.FC<PropsWithChildren<Props>> = (props) => {
  const { children, tooltipContent, tooltipId } = props

  return (
    <div className="table-grid__data-cell-flag no-csv" data-tooltip-html={tooltipContent} data-tooltip-id={tooltipId}>
      {React.Children.toArray(children)}
    </div>
  )
}

export default Flag
