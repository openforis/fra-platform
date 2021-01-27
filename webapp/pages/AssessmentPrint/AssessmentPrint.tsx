import './style.less'

import React, { memo } from 'react'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(2538) FIXME: Type 'unknown' cannot be used as an index type.
  const Component = Components[assessmentType]

  if (!countryStatusLoaded) {
    return <Loading />
  }

  return <div className="fra-print__container">{React.createElement(Component)}</div>
}

export default memo(AssessmentPrint)
