import './LinksTable.scss'
import React, { useEffect } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'

import { useAppDispatch, useInjectSlice } from 'client/store/hooks'
import { LinksActions } from 'client/store/links/actions'
import { LinksSlice } from 'client/store/links/slice'
import { LinksSliceName } from 'client/store/links/slice/name'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import TablePaginated from 'client/components/TablePaginated'
import { useInitSections } from 'client/pages/Country/hooks/useInitSections'

import { useColumns } from './hooks/useColumns'
import { useExtraActions } from './hooks/useExtraActions'
import { useFilters } from './hooks/useFilters'
import { useLinksChangeListener } from './hooks/useLinksChangeListener'
import { useListenLinksVerificationEvents } from './hooks/useListenLinksVerificationEvents'

type Props = {
  countryIso?: CountryIso
}

const LinksTable: React.FC<Props> = (props) => {
  const { countryIso } = props
  const { assessmentName, cycleName } = useSectionRouteParams()
  useInitSections()
  useInjectSlice({ reducerPath: LinksSliceName, reducer: LinksSlice.reducer })

  const columns = useColumns({ countryIso })
  const extraActions = useExtraActions({ assessmentName, countryIso, cycleName })
  const filters = useFilters({ countryIso })
  const path = ApiEndPoint.CycleData.Links.many()

  const dispatch = useAppDispatch()

  useLinksChangeListener({ countryIso, path })
  useListenLinksVerificationEvents({ countryIso, path })

  useEffect(() => {
    dispatch(LinksActions.getIsVerificationInProgress({ assessmentName, cycleName, countryIso }))
    dispatch(LinksActions.getVerificationSummary({ assessmentName, cycleName, countryIso }))
  }, [assessmentName, countryIso, cycleName, dispatch])

  return (
    <TablePaginated
      columns={columns}
      export
      extraActions={extraActions}
      filters={filters}
      gridTemplateColumns="2fr minmax(min-content, 1fr) minmax(264px, 1fr)" // 264px: Location width with padding
      path={path}
    />
  )
}

export default LinksTable
