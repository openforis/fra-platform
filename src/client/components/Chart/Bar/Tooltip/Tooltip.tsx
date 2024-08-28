import React from 'react'

import { TooltipProps } from 'recharts'

import TooltipContent from 'client/components/Chart/TooltipContent'

const Tooltip: React.FC<TooltipProps<never, never>> = (props) => {
  const { payload } = props

  if (!(payload.length > 0)) {
    return null
  }

  const content = payload.map((item) => ({
    color: item.color,
    label: item.payload.columnName,
    name: item.name,
    unit: item.unit,
    value: item.value as number,
  }))

  return <TooltipContent content={content} />
}

export default Tooltip
