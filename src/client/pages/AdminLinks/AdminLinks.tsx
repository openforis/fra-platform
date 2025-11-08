import './AdminLinks.scss'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'

import { LinksActions } from 'client/store/admin/links/actions'
import { useIsVerificationInProgress } from 'client/store/admin/links/hooks/verification'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import Button from 'client/components/Buttons/Button'
import TablePaginated from 'client/components/TablePaginated'
import { useFilters } from 'client/pages/AdminLinks/hooks/useFilters'
import { useInitSections } from 'client/pages/Country/hooks/useInitSections'

import { useColumns } from './hooks/useColumns'
import { useLinksChangeListener } from './hooks/useLinksChangeListener'
import { useListenLinksVerificationEvents } from './hooks/useListenLinksVerificationEvents'

const AdminLinks: React.FC = () => {
  const columns = useColumns()
  const filters = useFilters()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { assessmentName, cycleName } = useSectionRouteParams()

  useInitSections()

  const handleVerifyLinks = useCallback<() => void>(() => {
    dispatch(LinksActions.verifyLinks({ assessmentName, cycleName }))
  }, [assessmentName, cycleName, dispatch])

  const verifyLinksInProgress = useIsVerificationInProgress(assessmentName, cycleName)
  useLinksChangeListener()
  useListenLinksVerificationEvents()

  useEffect(() => {
    dispatch(LinksActions.getIsVerificationInProgress({ assessmentName, cycleName }))
  }, [assessmentName, cycleName, dispatch])

  const extraActions = useMemo<Array<React.ReactElement>>(
    () => [
      <div>
        <Button
          key="verify-links"
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
      path={ApiEndPoint.CycleData.Links.many()}
    />
  )
}

export default AdminLinks
