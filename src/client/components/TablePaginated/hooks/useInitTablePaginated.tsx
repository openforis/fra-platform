import { useEffect } from 'react'

import { TablePaginatedFilterType } from 'meta/tablePaginated'

import { useAppDispatch } from 'client/store/hooks'
import { injectSlice } from 'client/store/store'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useIsTablePaginatedInitialized } from 'client/store/tablePaginated/hooks/tablePaginated'
import { TablePaginatedSlice } from 'client/store/tablePaginated/slice'
import { useOnMount } from 'client/hooks/useOnMount'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = {
  filters: Array<TablePaginatedFilter<TablePaginatedFilterType>>
  path: string
}

export const useInitTablePaginated = (props: Props) => {
  const { filters, path } = props
  const dispatch = useAppDispatch()
  const isInitialized = useIsTablePaginatedInitialized(path)

  useOnMount(() => {
    injectSlice(TablePaginatedSlice)
  })

  useEffect(() => {
    if (!isInitialized) {
      dispatch(TablePaginatedActions.init({ filters, path }))
    }
  }, [dispatch, filters, isInitialized, path])
}
