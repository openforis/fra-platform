import { useCallback, useMemo, useState } from 'react'

import { Objects } from 'utils/objects'

import { Option, SelectProps } from 'client/components/Inputs/Select'

type Props = {
  options: SelectProps['options']
  value: SelectProps['value']
  multiLabelSummaryKey: SelectProps['multiLabelSummaryKey']
}

type Returned = {
  hideTooltip: () => void
  showTooltip: () => void
  tooltipContent: string | null
}

const getOptionsMap = (options: ReadonlyArray<Option>): Record<string, string> => {
  return options.reduce<Record<string, string>>((acc, { label, value: optValue }) => {
    return { ...acc, [optValue]: label as string }
  }, {})
}

export const useTooltipContent = (props: Props): Returned => {
  const { multiLabelSummaryKey, options, value } = props
  const [canDisplayTooltip, setCanDisplayTooltip] = useState(true)

  const valueToLabelMap = useMemo<Record<string, string>>(() => {
    return options.reduce((acc, item) => {
      if ('options' in item) {
        return { ...acc, ...getOptionsMap(item.options) }
      } else {
        return { ...acc, [item.value]: item.label }
      }
    }, {})
  }, [options])

  const tooltipContent = useMemo<string | null>(() => {
    if (Objects.isEmpty(value)) return null
    if (!canDisplayTooltip) return null
    if (Objects.isEmpty(multiLabelSummaryKey)) return null

    const selectedLabels = (value as Array<string>).reduce<Array<string>>((acc, v) => {
      const label = valueToLabelMap[v]
      if (!Objects.isEmpty(label)) acc.push(label)
      return acc
    }, [])

    if (selectedLabels.length === 0) return null
    return selectedLabels.join(', ')
  }, [canDisplayTooltip, multiLabelSummaryKey, value, valueToLabelMap])

  const hideTooltip = useCallback(() => setCanDisplayTooltip(false), [])
  const showTooltip = useCallback(() => setCanDisplayTooltip(true), [])

  return { hideTooltip, showTooltip, tooltipContent }
}
