import { useEffect } from 'react'

import { TablePaginatedFilterType } from 'meta/tablePaginated'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import { useIsTablePaginatedInitialized } from 'client/store/ui/tablePaginated/hooks'
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
