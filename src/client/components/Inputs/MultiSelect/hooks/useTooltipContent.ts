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
  tooltipLabels: Array<string>
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

  const tooltipLabels = useMemo<Array<string>>(() => {
    if (Objects.isEmpty(value)) return []
    if (!canDisplayTooltip) return []
    if (Objects.isEmpty(multiLabelSummaryKey)) return []

    return (value as Array<string>).reduce<Array<string>>((acc, v) => {
      const label = valueToLabelMap[v]
      if (!Objects.isEmpty(label)) acc.push(label)
      return acc
    }, [])
  }, [canDisplayTooltip, multiLabelSummaryKey, value, valueToLabelMap])

  const hideTooltip = useCallback(() => setCanDisplayTooltip(false), [])
  const showTooltip = useCallback(() => setCanDisplayTooltip(true), [])

  return { hideTooltip, showTooltip, tooltipLabels }
}
