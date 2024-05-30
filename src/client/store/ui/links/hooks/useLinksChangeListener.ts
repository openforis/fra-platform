import { useEffect } from 'react'

import { isAnyOf } from '@reduxjs/toolkit'

import { ApiEndPoint } from 'meta/api/endpoint'

import { addAppListener, useAppDispatch } from 'client/store'
import { LinksActions } from 'client/store/ui/links'
import { TablePaginatedActions, useTablePaginatedOrderBy, useTablePaginatedPage } from 'client/store/ui/tablePaginated'
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
