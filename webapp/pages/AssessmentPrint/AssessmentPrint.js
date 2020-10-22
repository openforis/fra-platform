import './style.less'

import React, { memo } from 'react'

import * as FRA from '@common/assessment/fra'

import Loading from '@webapp/components/loading'
import FraPrintView from '@webapp/app/assessment/fra/print/fraPrintView'

import { useAssessmentType } from '@webapp/store/app'
import { useInitCountry, useIsCountryStatusLoaded } from '@webapp/store/country'

const Components = {
  [FRA.type]: FraPrintView,
}

const AssessmentPrint = () => {
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
