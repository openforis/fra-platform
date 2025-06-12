import { useEffect } from 'react'

import { TablePaginatedFilterType } from 'meta/tablePaginated'

import { useAppDispatch, useInjectSlice } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useIsTablePaginatedInitialized } from 'client/store/tablePaginated/hooks/tablePaginated'
import { TablePaginatedSlice } from 'client/store/tablePaginated/slice'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = {
  filters: Array<TablePaginatedFilter<TablePaginatedFilterType>>
  path: string
}

export const useInitTablePaginated = (props: Props) => {
  const { filters, path } = props
  const dispatch = useAppDispatch()
  const isInitialized = useIsTablePaginatedInitialized(path)
  useInjectSlice(TablePaginatedSlice)

  useEffect(() => {
    if (!isInitialized) {
      dispatch(TablePaginatedActions.init({ filters, path }))
    }
  }, [dispatch, filters, isInitialized, path])
}
