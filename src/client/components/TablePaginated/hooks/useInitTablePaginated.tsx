import { useEffect } from 'react'

import { TablePaginatedFilterType } from 'meta/tablePaginated'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useIsTablePaginatedInitialized } from 'client/store/tablePaginated/hooks/tablePaginated'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = {
  filters: Array<TablePaginatedFilter<TablePaginatedFilterType>>
  path: string
}

export const useInitTablePaginated = (props: Props) => {
  const { filters, path } = props
  const dispatch = useAppDispatch()
  const isInitialized = useIsTablePaginatedInitialized(path)

  useEffect(() => {
    if (!isInitialized) {
      dispatch(TablePaginatedActions.init({ filters, path }))
    }
  }, [dispatch, filters, isInitialized, path])
}
