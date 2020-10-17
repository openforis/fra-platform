import './style.less'

import React, { memo } from 'react'
import { useParams } from 'react-router'

import * as FRA from '@common/assessment/fra'
import { useInitCountry, useIsCountryStatusLoaded } from '@webapp/store/country'

import Loading from '@webapp/components/loading'
import FraPrintView from '@webapp/app/assessment/fra/print/fraPrintView'

const Components = {
  [FRA.type]: FraPrintView,
}

const AssessmentPrint = () => {
  const { assessmentType } = useParams()
  useInitCountry()
  const countryStatusLoaded = useIsCountryStatusLoaded()

  const Component = Components[assessmentType]

  if (!countryStatusLoaded) {
    return <Loading />
  }

  return <div className="fra-print__container">{React.createElement(Component)}</div>
}

export default memo(AssessmentPrint)
