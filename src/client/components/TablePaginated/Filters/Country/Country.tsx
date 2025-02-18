import React from 'react'

import { CountryIso } from 'meta/area'
import { TablePaginatedFilterType } from 'meta/tablePaginated'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import { useTablePaginatedFilterValue } from 'client/store/ui/tablePaginated/hooks'
import CountryMultiSelect from 'client/components/CountryMultiSelect'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = TablePaginatedFilter<TablePaginatedFilterType.COUNTRY> & {
  path: string
}

const Country: React.FC<Props> = (props: Props) => {
  const { fieldName, label, path } = props
  const dispatch = useAppDispatch()
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
    <CountryMultiSelect
      onChange={(value) => handleChange(value as Array<CountryIso>)}
      placeholder={label}
      value={filterValue}
    />
  )
}

export default Country
