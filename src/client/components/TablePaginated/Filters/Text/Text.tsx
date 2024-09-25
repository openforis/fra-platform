import './Text.scss'
import React from 'react'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import { useTablePaginatedFilterValue } from 'client/store/ui/tablePaginated/hooks'
import Icon from 'client/components/Icon'
import InputText from 'client/components/Inputs/InputText'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = TablePaginatedFilter & {
  path: string
}

const Text = (props: Props) => {
  const { fieldName, label, path } = props
  const dispatch = useAppDispatch()

  const filterValue = useTablePaginatedFilterValue<string>(path, fieldName)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    dispatch(
      TablePaginatedActions.setFilterValue({
        fieldName,
        path,
        value,
      })
    )
  }

  const handleClearInput = () => {
    dispatch(TablePaginatedActions.resetFilter({ fieldName, path }))
  }

  return (
    <div className="table-paginated-filters__input-text-container">
      <InputText onChange={handleChange} placeholder={label} value={filterValue ?? ''} />
      <button className="clear-button icon" onClick={handleClearInput} type="button">
        <Icon className="icon-sub" name="remove" />
      </button>
    </div>
  )
}

export default Text
