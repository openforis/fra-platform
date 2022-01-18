import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Areas } from '@meta/area'

import { useCountryIso } from '@client/hooks'
import Icon from '@client/components/Icon'
import { useAssessment } from '@client/store/assessment'
import { BasePaths } from '@client/basePaths'
import NavAssessment from '../NavAssessment'

const NavigationDesktop: React.FC = () => {
  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const assessmentType = assessment.props.name

  return (
    <div className="nav no-print">
      <NavAssessment />

      {Areas.isGlobal(countryIso) && (
        <Link
          className="btn-s btn-primary nav__bulk-download"
          to={BasePaths.Assessment.dataDownload(countryIso, assessmentType)}
        >
          <Icon className="icon-sub icon-white" name="hit-down" />
          {i18n.t('dataDownload.dataDownload')}
        </Link>
      )}
    </div>
  )
}

export default NavigationDesktop
