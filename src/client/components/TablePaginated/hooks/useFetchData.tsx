import { useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions, useTablePaginatedOrderBy, useTablePaginatedPage } from 'client/store/ui/tablePaginated'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { TablePaginatedCounter } from 'client/components/TablePaginated/types'

type Props = {
  counter: TablePaginatedCounter
  limit: number
  path: string
}

export const useFetchData = (props: Props): void => {
  const { path, limit, counter } = props

  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams()
  const page = useTablePaginatedPage(path)
  const orderBy = useTablePaginatedOrderBy(path)

  useEffect(() => {
    if (!counter.show) return
    dispatch(TablePaginatedActions.getCount({ assessmentName, cycleName, countryIso, sectionName, path }))
  }, [assessmentName, counter, countryIso, cycleName, dispatch, path, sectionName])

  useEffect(() => {
    const params = { assessmentName, cycleName, countryIso, sectionName, orderBy, page, path, limit }
    dispatch(TablePaginatedActions.getData(params))
  }, [assessmentName, countryIso, cycleName, dispatch, limit, orderBy, page, path, sectionName])
}
