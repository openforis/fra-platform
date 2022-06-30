import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Areas } from '@meta/area'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'
import { ClientRoutes } from '@client/clientRoutes'
import Icon from '@client/components/Icon'

import NavAssessment from '../NavAssessment'

const NavigationDesktop: React.FC = () => {
  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const assessmentName = assessment.props.name

  return (
    <div className="nav no-print">
      <NavAssessment />

      {Areas.isGlobal(countryIso) && (
        <Link
          className="btn-s btn-primary nav__bulk-download"
          to={ClientRoutes.Assessment.DataDownload.getLink({ countryIso, assessmentName, cycleName: cycle.name })}
        >
          <>
            <Icon className="icon-sub icon-white" name="hit-down" />
            {i18n.t('dataDownload.dataDownload')}
          </>
        </Link>
      )}
    </div>
  )
}

export default NavigationDesktop
