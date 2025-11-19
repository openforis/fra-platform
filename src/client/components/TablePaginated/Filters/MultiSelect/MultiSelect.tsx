import './MultiSelect.scss'
import React from 'react'

import { TablePaginatedFilterType } from 'meta/tablePaginated/filters/filter'
import { TooltipId } from 'meta/tooltip/id'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useTablePaginatedFilterValue } from 'client/store/tablePaginated/hooks/tablePaginated'
import CommonMultiSelect from 'client/components/Inputs/MultiSelect/MultiSelect'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

import { useTooltipContent } from './hooks/useTooltipContent'

type Props = TablePaginatedFilter<TablePaginatedFilterType.MULTI_SELECT> & {
  path: string
}

const MultiSelect: React.FC<Props> = (props: Props) => {
  const { fieldName, label, multiLabelSummaryKey, options, path } = props

  const dispatch = useAppDispatch()

  const { hideTooltip, showTooltip, tooltipContent } = useTooltipContent({ fieldName, options, path })

  const filterValue = useTablePaginatedFilterValue<Array<string>>(path, fieldName)

  const handleChange = (value: Array<string>): void => {
    dispatch(
      TablePaginatedActions.setFilterValue({
        fieldName,
        path,
        value,
      })
    )
  }

  return (
    <div
      className="filter-multiselect__tooltip-trigger"
      data-tooltip-content={tooltipContent}
      data-tooltip-id={TooltipId.info}
    >
      <CommonMultiSelect
        multiLabelSummaryKey={multiLabelSummaryKey}
        onChange={handleChange}
        onMenuClose={showTooltip}
        onMenuOpen={hideTooltip}
        options={options}
        placeholder={label}
        value={filterValue}
      />
    </div>
  )
}

export default MultiSelect
