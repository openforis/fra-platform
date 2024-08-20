import 'client/components/Chart/TooltipContent/TooltipContent.scss'
import React, { ReactNode } from 'react'

import { Numbers } from 'utils/numbers'

type Content = {
  color: string
  label: string
  name: string
  percent?: number
  unit?: string | ReactNode
  value: number
}

type Props = {
  content: Array<Content>
}

const TooltipContent: React.FC<Props> = (props) => {
  const { content } = props

  if (content.length === 0) {
    return null
  }

  return (
    <div className="chart-tooltip__container">
      {content.map((item, index) => (
        <React.Fragment key={item.name}>
          {index !== 0 && <div className="hr" />}

          <div className="chart-tooltip__legend-box">
            <div style={{ backgroundColor: item.color, boxShadow: `0 0 6px 2px ${item.color} inset` }} />
          </div>

          <div>
            {item.name} {item.label}
          </div>

          <div className="chart-tooltip__value">
            {Numbers.format(item.value)} ({item.unit}) {item.percent && `(${Numbers.format(item.percent)}%)`}
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default TooltipContent
