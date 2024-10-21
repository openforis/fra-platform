import { useCallback, useMemo, useState } from 'react'

import { Objects } from 'utils/objects'

import { TablePaginatedFilterType } from 'meta/tablePaginated'

import { useTablePaginatedFilterValue } from 'client/store/ui/tablePaginated/hooks'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = {
  fieldName: string
  options: TablePaginatedFilter<TablePaginatedFilterType.MULTI_SELECT>['options']
  path: string
}

type Returned = {
  hideTooltip: () => void
  showTooltip: () => void
  tooltipContent: string | null
}

export const useTooltipContent = (props: Props): Returned => {
  const { fieldName, options, path } = props
  const filterValue = useTablePaginatedFilterValue<Array<string>>(path, fieldName)
  const [canDisplayTooltip, setCanDisplayTooltip] = useState(true)

  const valueToLabelMap = useMemo<Record<string, string>>(() => {
    return options.reduce<Record<string, string>>((acc, { value, label }) => {
      return { ...acc, [value]: label }
    }, {})
  }, [options])

  const tooltipContent = useMemo<string | null>(() => {
    if (Objects.isEmpty(filterValue)) return null
    if (!canDisplayTooltip) return null

    const selectedLabels = filterValue.reduce<Array<string>>((acc, value) => {
      const label = valueToLabelMap[value]
      if (!Objects.isEmpty(label)) acc.push(label)
      return acc
    }, [])

    if (selectedLabels.length === 0) {
      return null
    }
    return selectedLabels.join(', ')
  }, [canDisplayTooltip, filterValue, valueToLabelMap])

  const hideTooltip = useCallback(() => setCanDisplayTooltip(false), [])
  const showTooltip = useCallback(() => setCanDisplayTooltip(true), [])

  return {
    hideTooltip,
    showTooltip,
    tooltipContent,
  }
}
