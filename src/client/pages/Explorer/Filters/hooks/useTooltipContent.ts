import { useCallback, useMemo, useState } from 'react'

import { Objects } from 'utils/objects'

import { Option } from 'client/components/Inputs/Select'

type Props = {
  options: Array<Option>
  value: Array<string> | undefined
}

type Returned = {
  hideTooltip: () => void
  showTooltip: () => void
  tooltipContent: string | null
}

export const useTooltipContent = (props: Props): Returned => {
  const { options, value } = props
  const [canDisplayTooltip, setCanDisplayTooltip] = useState(true)

  const valueToLabelMap = useMemo<Record<string, string>>(() => {
    return options.reduce<Record<string, string>>((acc, { label, value: optValue }) => {
      return { ...acc, [optValue]: label as string }
    }, {})
  }, [options])

  const tooltipContent = useMemo<string | null>(() => {
    if (Objects.isEmpty(value)) return null
    if (!canDisplayTooltip) return null

    const selectedLabels = value.reduce<Array<string>>((acc, v) => {
      const label = valueToLabelMap[v]
      if (!Objects.isEmpty(label)) acc.push(label)
      return acc
    }, [])

    if (selectedLabels.length === 0) return null
    return selectedLabels.join(', ')
  }, [canDisplayTooltip, value, valueToLabelMap])

  const hideTooltip = useCallback(() => setCanDisplayTooltip(false), [])
  const showTooltip = useCallback(() => setCanDisplayTooltip(true), [])

  return { hideTooltip, showTooltip, tooltipContent }
}
