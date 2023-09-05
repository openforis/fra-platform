import { useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions, useTablePaginatedPage } from 'client/store/ui/tablePaginated'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useFetchData = (props: { path: string }): void => {
  const { path } = props

  const dispatch = useAppDispatch()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const page = useTablePaginatedPage(path)

  useEffect(() => {
    dispatch(TablePaginatedActions.getCount({ assessmentName, cycleName, path }))
  }, [assessmentName, cycleName, dispatch, path])

  useEffect(() => {
    dispatch(TablePaginatedActions.getData({ assessmentName, cycleName, page, path }))
  }, [assessmentName, cycleName, dispatch, page, path])
}
