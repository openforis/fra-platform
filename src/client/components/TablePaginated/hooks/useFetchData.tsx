import { useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions, useTablePaginatedOrderBy, useTablePaginatedPage } from 'client/store/ui/tablePaginated'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  path: string
  limit?: number
}

export const useFetchData = (props: Props): void => {
  const { path, limit } = props

  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const page = useTablePaginatedPage(path)
  const orderBy = useTablePaginatedOrderBy(path)

  useEffect(() => {
    dispatch(TablePaginatedActions.getCount({ assessmentName, cycleName, countryIso, path }))
  }, [assessmentName, countryIso, cycleName, dispatch, path])

  useEffect(() => {
    const params = { assessmentName, cycleName, countryIso, orderBy, page, path, limit }
    dispatch(TablePaginatedActions.getData(params))
  }, [assessmentName, countryIso, cycleName, dispatch, limit, orderBy, page, path])
}
