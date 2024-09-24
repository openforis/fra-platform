import './Text.scss'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Functions } from 'utils/functions'
import { Objects } from 'utils/objects'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import { useTablePaginatedFilterValue } from 'client/store/ui/tablePaginated/hooks'
import InputText from 'client/components/Inputs/InputText'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = TablePaginatedFilter & {
  path: string
}

const Text = (props: Props) => {
  const { fieldName, label, path } = props
  const dispatch = useAppDispatch()
  const storeValue = useTablePaginatedFilterValue(path, fieldName) as string

  const [localInputValue, setLocalInputValue] = useState('')
  useEffect(() => {
    // When filter is reset
    if (Objects.isEmpty(storeValue)) {
      setLocalInputValue('')
    }
  }, [storeValue])

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
    </div>
  )
}

export default Text
