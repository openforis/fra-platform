import React from 'react'

import { TablePaginatedFilterType } from 'meta/tablePaginated'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import { useTablePaginatedFilterValue } from 'client/store/ui/tablePaginated/hooks'
import Select from 'client/components/Inputs/Select'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = TablePaginatedFilter<TablePaginatedFilterType.MULTI_SELECT> & {
  path: string
}

const MultiSelect = (props: Props) => {
  const { fieldName, label, path, options } = props

  const dispatch = useAppDispatch()

  const filterValue = useTablePaginatedFilterValue<string>(path, fieldName)

  const handleChange = (value: Array<string>) => {
    dispatch(
      TablePaginatedActions.setFilterValue({
        fieldName,
        path,
        value,
      })
    )
  }

  return <Select isMulti onChange={handleChange} options={options} placeholder={label} value={filterValue} />
}

export default MultiSelect
