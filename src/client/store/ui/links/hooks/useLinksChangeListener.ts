import { useEffect } from 'react'

import { isAnyOf } from '@reduxjs/toolkit'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useAppDispatch } from 'client/store/hooks'
import { addAppListener } from 'client/store/middleware/listener'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useTablePaginatedOrderBy, useTablePaginatedPage } from 'client/store/tablePaginated/hooks/tablePaginated'
import { LinksActions } from 'client/store/ui/links'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useLinksChangeListener = () => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const dispatch = useAppDispatch()
  const path = ApiEndPoint.CycleData.Links.many()
  const page = useTablePaginatedPage(path)
  const orderBy = useTablePaginatedOrderBy(path)

  useEffect(() => {
    return dispatch(
      addAppListener({
        matcher: isAnyOf(LinksActions.updateLink.fulfilled),
        effect: () => {
          const getDataProps = { assessmentName, cycleName, limit: 30, orderBy, page, path }
          dispatch(TablePaginatedActions.getData(getDataProps))
        },
      })
    )
  }, [assessmentName, countryIso, cycleName, dispatch, orderBy, page, path])
}
