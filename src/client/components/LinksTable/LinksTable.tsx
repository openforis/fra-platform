import './LinksTable.scss'
import React, { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'

import { LinksActions } from 'client/store/admin/links/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import TablePaginated from 'client/components/TablePaginated'

import { useColumns } from './hooks/useColumns'
import { useExtraActions } from './hooks/useExtraActions'
import { useFilters } from './hooks/useFilters'
import { useLinksChangeListener } from './hooks/useLinksChangeListener'
import { useLinksPath } from './hooks/useLinksPath'
import { useListenLinksVerificationEvents } from './hooks/useListenLinksVerificationEvents'

type Props = {
  countryIso?: CountryIso
}

const LinksTable: React.FC<Props> = (props) => {
  const { countryIso } = props
  const { assessmentName, cycleName } = useSectionRouteParams()

  const columns = useColumns({ countryIso })
  const extraActions = useExtraActions({ assessmentName, countryIso, cycleName })
  const filters = useFilters({ countryIso })
  const path = useLinksPath({ countryIso })

  const dispatch = useAppDispatch()

  useLinksChangeListener({ countryIso, path })
  useListenLinksVerificationEvents({ countryIso, path })

  useEffect(() => {
    dispatch(LinksActions.getIsVerificationInProgress({ assessmentName, cycleName, countryIso }))
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
