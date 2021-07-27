import React from 'react'
import { FRA } from '@core/assessment'
import PanEuropean from '@core/assessment/panEuropean'
import { Link } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'

import { useCountryIso, useI18n } from '@webapp/components/hooks'
import Icon from '@webapp/components/icon'
import { isISOGlobal } from '@common/country/area'
import { useAssessmentType } from '@webapp/store/app'
import Assessment from '../Assessment'

const NavigationDesktop: React.FC = () => {
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const assessmentType = useAssessmentType()
  const assessment = [FRA, PanEuropean].find(({ type }) => type === assessmentType)

  return (
    <div className="nav no-print">
      <Assessment assessment={assessment} />

      {isISOGlobal(countryIso) && (
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
