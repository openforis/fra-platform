import { useEffect } from 'react'
import { isAnyOf } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'

import { useAppDispatch } from 'client/store/hooks'
import { LinksActions } from 'client/store/links/actions'
import { addAppListener } from 'client/store/middleware/listener'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import {
  useTablePaginatedFilters,
  useTablePaginatedOrderBy,
  useTablePaginatedPage,
} from 'client/store/tablePaginated/hooks/tablePaginated'
import { useSectionRouteParams } from 'client/hooks/routeParams'

type Props = {
  countryIso?: CountryIso
  path: string
}

export const useLinksChangeListener = (props: Props): void => {
  const { countryIso, path } = props
  const { assessmentName, cycleName } = useSectionRouteParams()

  const dispatch = useAppDispatch()
  const page = useTablePaginatedPage(path)
  const orderBy = useTablePaginatedOrderBy(path)
  const filters = useTablePaginatedFilters(path)

  useEffect(() => {
    return dispatch(
      addAppListener({
        matcher: isAnyOf(LinksActions.updateLink.fulfilled),
        effect: () => {
          const getDataProps = { assessmentName, countryIso, cycleName, filters, limit: 30, orderBy, page, path }
          dispatch(TablePaginatedActions.getData(getDataProps))
          dispatch(LinksActions.getVerificationSummary({ assessmentName, cycleName, countryIso }))
        },
      })
    )
  }, [assessmentName, countryIso, cycleName, dispatch, filters, orderBy, page, path])
}
