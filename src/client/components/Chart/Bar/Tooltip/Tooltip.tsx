import React from 'react'
import { ContentType } from 'recharts/types/component/Tooltip'

import TooltipContent from 'client/components/Chart/TooltipContent'

const Tooltip: ContentType = (props) => {
  const { payload } = props

  if (!(payload.length > 0)) {
    return null
  }

  const content = payload.map((item) => ({
    color: item.color,
    label: item.payload.columnName,
    name: item.name as string,
    unit: item.unit,
    value: item.value as number,
  }))

  return <TooltipContent content={content} />
}

export default Tooltip
