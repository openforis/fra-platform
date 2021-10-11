import './style.less'
import React, { memo } from 'react'

import { FRA } from '@core/assessment'
import { useAssessmentType } from '@webapp/store/app'

import { useInitCountry, useIsCountryStatusLoaded } from '@webapp/store/country'

import Loading from '@webapp/components/loading'
import FraPrint from '@webapp/components/Assessment/FraPrint'

const Components: Record<string, React.FC> = {
  [FRA.type]: FraPrint,
}

const AssessmentPrint: React.FC = () => {
  useInitCountry()
  const assessmentType = useAssessmentType()
  const countryStatusLoaded = useIsCountryStatusLoaded()

  const Component = Components[assessmentType]

  if (!countryStatusLoaded) {
    return <Loading />
  }

  return <div className="fra-print__container">{React.createElement(Component)}</div>
}

export default memo(AssessmentPrint)
