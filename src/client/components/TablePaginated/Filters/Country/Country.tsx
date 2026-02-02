import React from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { TablePaginatedFilterType } from 'meta/tablePaginated/filters/filter'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useTablePaginatedFilterValue } from 'client/store/tablePaginated/hooks/tablePaginated'
import CountryMultiSelect from 'client/components/CountryMultiSelect'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = TablePaginatedFilter<TablePaginatedFilterType.COUNTRY> & {
  path: string
}

const Country: React.FC<Props> = (props: Props) => {
  const { disabled, fieldName, label, path } = props
  const dispatch = useAppDispatch()
  const filterValue = useTablePaginatedFilterValue<Array<string>>(path, fieldName)

  const handleChange = (value: Array<string>): void => {
    dispatch(TablePaginatedActions.setFilterValue({ fieldName, path, value }))
  }

  return (
    <CountryMultiSelect
      disabled={disabled}
      onChange={(value): void => handleChange(value as Array<CountryIso>)}
      placeholder={label}
      value={filterValue}
    />
  )
}

export default Country
