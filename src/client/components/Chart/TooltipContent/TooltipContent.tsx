import 'client/components/Chart/TooltipContent/TooltipContent.scss'
import React from 'react'

import { TooltipProps } from 'recharts'
import { Numbers } from 'utils/numbers'

const TooltipContent: React.FC<TooltipProps<never, never>> = (props) => {
  const { label, payload } = props

  if (!(payload.length > 0)) {
    return null
  }

  return (
    <div className="chart-tooltip__container">
      {payload.map((item, index) => (
        <React.Fragment key={item.name}>
          {index !== 0 && <div className="hr" />}

          <div className="chart-tooltip__legend-box">
            <div style={{ backgroundColor: item.color, boxShadow: `0 0 6px 2px ${item.color} inset` }} />
          </div>

          <div>
            {item.name} {label}
          </div>

          <div className="chart-tooltip__value">
            {Numbers.format(item.value as number)} {item.unit}
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default TooltipContent
