import './MultiSelect.scss'
import React from 'react'

import classNames from 'classnames'

import { TablePaginatedFilterType } from 'meta/tablePaginated'
import { TooltipId } from 'meta/tooltip'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import { useTablePaginatedFilterValue } from 'client/store/ui/tablePaginated/hooks'
import Select from 'client/components/Inputs/Select'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

import { useTooltipContent } from './hooks/useTooltipContent'

type Props = TablePaginatedFilter<TablePaginatedFilterType.MULTI_SELECT> & {
  path: string
}

const MultiSelect: React.FC<Props> = (props: Props) => {
  const { fieldName, label, path, options } = props

  const dispatch = useAppDispatch()

  const { hideTooltip, showTooltip, tooltipContent } = useTooltipContent({ fieldName, options, path })

  const filterValue = useTablePaginatedFilterValue<Array<string>>(path, fieldName)

  const handleChange = (value: Array<string>) => {
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
      <Select
        classNames={{
          container: classNames('filter-multiselect__container', {
            active: filterValue?.length > 0,
          }),
        }}
        isMulti
        multiLabelSummaryKey="admin.role"
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
