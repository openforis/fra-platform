import React from 'react'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { TablePaginatedFilterType } from 'meta/tablePaginated'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import { useTablePaginatedFilterValue } from 'client/store/ui/tablePaginated/hooks'
import ButtonCheckbox from 'client/components/Buttons/ButtonCheckbox'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = TablePaginatedFilter<TablePaginatedFilterType.SWITCH> & {
  path: string
}

const Switch = (props: Props) => {
  const { fieldName, label, path } = props
  const dispatch = useAppDispatch()

  const filterValue = useTablePaginatedFilterValue<boolean>(path, fieldName)

  const handleChange = () => {
    const value = !filterValue
    dispatch(TablePaginatedActions.setFilterValue({ fieldName, path, value }))
  }

  return (
    <div className={classNames('table-paginated-filter-input', { active: !Objects.isEmpty(filterValue) })}>
      <ButtonCheckbox checked={filterValue ?? false} label={label} onClick={handleChange} />
    </div>
  )
}

export default Switch
