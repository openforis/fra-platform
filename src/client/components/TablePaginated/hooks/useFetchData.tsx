import { useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions, useTablePaginatedOrderBy, useTablePaginatedPage } from 'client/store/ui/tablePaginated'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useFetchData = (props: { path: string; params: Record<string, string> }): void => {
  const { path, params } = props

  const dispatch = useAppDispatch()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const page = useTablePaginatedPage(path)
  const orderBy = useTablePaginatedOrderBy(path)

  useEffect(() => {
    dispatch(TablePaginatedActions.getCount({ assessmentName, cycleName, path, params }))
  }, [assessmentName, cycleName, dispatch, params, path])

  useEffect(() => {
    dispatch(TablePaginatedActions.getData({ assessmentName, cycleName, orderBy, page, path, params }))
  }, [assessmentName, cycleName, dispatch, orderBy, page, params, path])
}
