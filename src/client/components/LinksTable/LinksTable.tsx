import './LinksTable.scss'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'

import { LinksActions } from 'client/store/admin/links/actions'
import { useIsVerificationInProgress } from 'client/store/admin/links/hooks/verification'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import Button from 'client/components/Buttons/Button'
import TablePaginated from 'client/components/TablePaginated'

import { useColumns } from './hooks/useColumns'
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
  const filters = useFilters({ countryIso })
  const path = useLinksPath({ countryIso })

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleVerifyLinks = useCallback<() => void>(() => {
    dispatch(LinksActions.verifyLinks({ assessmentName, cycleName, countryIso }))
  }, [assessmentName, countryIso, cycleName, dispatch])

  const verifyLinksInProgress = useIsVerificationInProgress(assessmentName, cycleName, countryIso)
  useLinksChangeListener({ countryIso, path })
  useListenLinksVerificationEvents({ countryIso, path })

  useEffect(() => {
    dispatch(LinksActions.getIsVerificationInProgress({ assessmentName, cycleName, countryIso }))
  }, [assessmentName, countryIso, cycleName, dispatch])

  const extraActions = useMemo<Array<React.ReactElement>>(
    () => [
      <div key="verify-links">
        <Button
          className="verify-links-button"
          disabled={verifyLinksInProgress ?? true}
          label={t('admin.verifyLinks')}
          onClick={handleVerifyLinks}
        />
      </div>,
    ],
    [handleVerifyLinks, t, verifyLinksInProgress]
  )

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
