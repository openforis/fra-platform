import { useEffect, useMemo, useState } from 'react'

import { TablePaginatedFilterType } from 'meta/tablePaginated'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = {
  filters: Array<TablePaginatedFilter<TablePaginatedFilterType>>
  path: string
}

export const useSetHiddenFilters = (props: Props): boolean => {
  const { filters, path } = props
  const dispatch = useAppDispatch()

  const [hiddenFiltersSet, setHiddenFiltersSet] = useState(false)

  const hiddenFilters = useMemo<Array<TablePaginatedFilter<TablePaginatedFilterType>>>(
    () => filters.filter((filter) => filter.hidden),
    [filters]
  )

  useEffect(() => {
    if (hiddenFilters.length === 0) {
      setHiddenFiltersSet(true)
      return
    }

    dispatch(
      TablePaginatedActions.setMultipleFilterValues({
        filters: hiddenFilters.map(({ fieldName, defaultValue }) => ({
          fieldName,
          value: defaultValue,
        })),
        path,
      })
    )

    setHiddenFiltersSet(true)
  }, [dispatch, hiddenFilters, path])

  return hiddenFiltersSet
}
