import './Text.scss'
import React from 'react'
import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { TablePaginatedFilterType } from 'meta/tablePaginated/filters/filter'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useTablePaginatedFilterValue } from 'client/store/tablePaginated/hooks/tablePaginated'
import Icon from 'client/components/Icon'
import InputText from 'client/components/Inputs/InputText'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = TablePaginatedFilter<TablePaginatedFilterType.TEXT> & {
  path: string
}

const Text: React.FC<Props> = (props) => {
  const { fieldName, label, path } = props
  const dispatch = useAppDispatch()

  const filterValue = useTablePaginatedFilterValue<string>(path, fieldName)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    dispatch(
      TablePaginatedActions.setFilterValue({
        fieldName,
        path,
        value,
      })
    )
  }

  const handleClearInput = (): void => {
    dispatch(TablePaginatedActions.resetFilter({ fieldName, path }))
  }

  return (
    <div className={classNames('table-paginated-filter-input', { active: !Objects.isEmpty(filterValue) })}>
      <InputText onChange={handleChange} placeholder={label} value={filterValue ?? ''} />
      {!Objects.isEmpty(filterValue) && (
        <button className="clear-button icon" onClick={handleClearInput} type="button">
          <Icon name="remove" />
        </button>
      )}
    </div>
  )
}

export default Text
