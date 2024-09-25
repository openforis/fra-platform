import './Text.scss'
import React, { useCallback, useMemo, useState } from 'react'

import { Functions } from 'utils/functions'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import Icon from 'client/components/Icon'
import InputText from 'client/components/Inputs/InputText'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = TablePaginatedFilter & {
  path: string
}

const Text = (props: Props) => {
  const { fieldName, label, path } = props
  const dispatch = useAppDispatch()

  const [localInputValue, setLocalInputValue] = useState('')

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      dispatch(
        TablePaginatedActions.setFilterValue({
          fieldName,
          path,
          value,
        })
      )
    },
    [dispatch, fieldName, path]
  )

  const handleChangeThrottle = useMemo(
    () =>
      Functions.throttle((event: React.ChangeEvent<HTMLInputElement>) => handleChange(event), 250, { trailing: true }),
    [handleChange]
  )

  const handleClearInput = () => {
    setLocalInputValue('')
    dispatch(TablePaginatedActions.resetFilter({ fieldName, path }))
  }

  return (
    <div className="table-paginated-filters__input-text-container">
      <InputText
        onChange={(e) => {
          setLocalInputValue(e.target.value)
          handleChangeThrottle(e)
        }}
        placeholder={label}
        value={localInputValue}
      />
      <button className="clear-button icon" onClick={handleClearInput} type="button">
        <Icon className="icon-sub" name="remove" />
      </button>
    </div>
  )
}

export default Text
