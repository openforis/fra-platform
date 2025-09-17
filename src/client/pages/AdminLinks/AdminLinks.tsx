import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'

import { LinksActions } from 'client/store/admin/links/actions'
import { useIsVerificationInProgress } from 'client/store/admin/links/hooks/verification'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import Button from 'client/components/Buttons/Button'
import TablePaginated from 'client/components/TablePaginated'
import { useFilters } from 'client/pages/AdminLinks/hooks/useFilters'

import { useColumns } from './hooks/useColumns'
import { useLinksChangeListener } from './hooks/useLinksChangeListener'
import { useListenLinksVerificationEvents } from './hooks/useListenLinksVerificationEvents'

const AdminLinks: React.FC = () => {
  const columns = useColumns()
  const filters = useFilters()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { assessmentName, cycleName } = useSectionRouteParams()

  const handleVerifyLinks = (): void => {
    dispatch(LinksActions.verifyLinks({ assessmentName, cycleName }))
  }

  const verifyLinksInProgress = useIsVerificationInProgress(assessmentName, cycleName)
  useLinksChangeListener()
  useListenLinksVerificationEvents()

  useEffect(() => {
    dispatch(LinksActions.getIsVerificationInProgress({ assessmentName, cycleName }))
  }, [assessmentName, cycleName, dispatch])

  return (
    <>
      <div>
        <Button disabled={verifyLinksInProgress ?? true} label={t('admin.verifyLinks')} onClick={handleVerifyLinks} />
      </div>
      <TablePaginated
        columns={columns}
        filters={filters}
        gridTemplateColumns="auto min-content min-content"
        path={ApiEndPoint.CycleData.Links.many()}
      />
    </>
  )
}

export default AdminLinks
