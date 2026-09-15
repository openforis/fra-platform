import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryStatus } from 'meta/area/countryStatus'

import { useSummaryHasErrors } from 'client/store/data/validations/summary/hooks/summary'
import Icon from 'client/components/Icon'
import { StatusTransition } from 'client/components/PageLayout/Toolbar/Status/types'

type Props = {
  status: StatusTransition
}

const ValidationWarning: React.FC<Props> = (props) => {
  const { status } = props

  const { t } = useTranslation()
  const summaryHasErrors = useSummaryHasErrors()

  const show = status.direction === 'next' && status.status === CountryStatus.review && summaryHasErrors

  if (!show) return null

  return (
    <div className="assessment-status-confirm__notice assessment-status-confirm__notice-error">
      <Icon className="assessment-status-confirm__notice-icon" name="alert" />
      <div className="assessment-status-confirm__notice-content">
        <div className="assessment-status-confirm__notice-text">{t('navigation.submitToReviewWithErrorsWarning')}</div>
      </div>
    </div>
  )
}

export default ValidationWarning
