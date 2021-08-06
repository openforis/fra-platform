import React from 'react'
import { Link } from 'react-router-dom'

import { Assessment } from '@core/assessment'
import { Areas } from '@core/country'
import * as BasePaths from '@webapp/main/basePaths'
import { useAssessmentType } from '@webapp/store/app'

import { useCountryIso, useI18n } from '@webapp/components/hooks'
import Icon from '@webapp/components/icon'
import NavAssessment from '../NavAssessment'

type Props = {
  assessment: Assessment
}

const NavigationDesktop: React.FC<Props> = (props) => {
  const { assessment } = props

  const i18n = useI18n()
  const countryIso = useCountryIso()
  const assessmentType = useAssessmentType()

  return (
    <div className="nav no-print">
      <NavAssessment assessment={assessment} />

      {Areas.isISOGlobal(countryIso) && (
        <Link
          className="btn-s btn-primary nav__bulk-download"
          to={BasePaths.getAssessmentDataDownloadLink(countryIso, assessmentType)}
        >
          <Icon className="icon-sub icon-white" name="hit-down" />
          {i18n.t('dataDownload.dataDownload')}
        </Link>
      )}
    </div>
  )
}

export default NavigationDesktop
