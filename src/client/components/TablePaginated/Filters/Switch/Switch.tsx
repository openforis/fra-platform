import React from 'react'
import classNames from 'classnames'

import { TablePaginatedFilterType } from 'meta/tablePaginated/filters/filter'
import { Objects } from 'utils/objects'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useTablePaginatedFilterValue } from 'client/store/tablePaginated/hooks/tablePaginated'
import ButtonCheckbox from 'client/components/Buttons/ButtonCheckbox'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = TablePaginatedFilter<TablePaginatedFilterType.SWITCH> & {
  path: string
}

const Switch: React.FC<Props> = (props) => {
  const { disabled, fieldName, label, path } = props
  const dispatch = useAppDispatch()

  const filterValue = useTablePaginatedFilterValue<boolean>(path, fieldName)

  const handleChange = (): void => {
    const value = !filterValue
    dispatch(TablePaginatedActions.setFilterValue({ fieldName, path, value }))
  }

  return (
    <div className={classNames('table-paginated-filter-input', { active: !Objects.isEmpty(filterValue) })}>
      <ButtonCheckbox checked={filterValue ?? false} disabled={disabled} label={label} onClick={handleChange} />
    </div>
  )
}

export default Switch
