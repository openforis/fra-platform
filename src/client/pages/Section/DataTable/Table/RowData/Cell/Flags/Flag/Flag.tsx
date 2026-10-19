import './Flag.scss'
import React, { PropsWithChildren } from 'react'

import { TooltipProps } from 'client/components/Tooltips/type'
import WithTooltip from 'client/components/Tooltips/WithTooltip'

type Props = {
  tooltip?: TooltipProps
}

const Flag: React.FC<PropsWithChildren<Props>> = (props) => {
  const { children, tooltip } = props

  return (
    <WithTooltip className="table-grid__data-cell-flag no-csv" tooltip={tooltip}>
      {children}
    </WithTooltip>
  )
}

export default Flag
