import React from 'react'
import { useTranslation } from 'react-i18next'

import { TooltipProps } from 'recharts'

import { Labels } from 'meta/assessment'

import TooltipContent from 'client/components/Chart/TooltipContent'

const Tooltip: React.FC<TooltipProps<never, never> & { totalValue: number }> = (props) => {
  const { payload, totalValue } = props
  const { t } = useTranslation()

  if (!(payload.length > 0)) {
    return null
  }

  const content = payload.map((item) => ({
    color: item.payload.color,
    name: Labels.getLabel({ label: item.payload.label, t }),
    percent: ((item.value as number) / totalValue) * 100,
    unit: t(item.payload.unit),
    value: item.value as number,
  }))

  return <TooltipContent content={content} />
}

export default Tooltip
