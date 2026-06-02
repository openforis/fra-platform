import React from 'react'

import { TablePaginatedFilterType } from 'meta/tablePaginated/filters/filter'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useTablePaginatedFilterValue } from 'client/store/tablePaginated/hooks/tablePaginated'
import CommonMultiSelect from 'client/components/Inputs/MultiSelect/MultiSelect'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = TablePaginatedFilter<TablePaginatedFilterType.MULTI_SELECT> & {
  path: string
}

const MultiSelect: React.FC<Props> = (props: Props) => {
  const { disabled, fieldName, label, multiLabelSummaryKey, options, path } = props

  const dispatch = useAppDispatch()
  const filterValue = useTablePaginatedFilterValue<Array<string>>(path, fieldName)

  const handleChange = (value: Array<string>): void => {
    dispatch(TablePaginatedActions.setFilterValue({ fieldName, path, value }))
  }

  return (
    <CommonMultiSelect
      disabled={disabled}
      multiLabelSummaryKey={multiLabelSummaryKey}
      onChange={handleChange}
      options={options}
      placeholder={label}
      value={filterValue}
    />
  )
}

export default MultiSelect
