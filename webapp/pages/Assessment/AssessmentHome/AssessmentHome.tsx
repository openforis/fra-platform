import './FraHome/fraHome.less'

import React from 'react'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as PanEuropean from '@common/assessment/panEuropean'

import { useAssessmentType } from '@webapp/store/app'

import FraHome from './FraHome'
import PanEuropeanHome from './PanEuropeanHome'

const Components = {
  [FRA.type]: FraHome,
  [PanEuropean.type]: PanEuropeanHome,
}

const AssessmentHome = () => {
  const assessmentType = useAssessmentType()
  // @ts-expect-error ts-migrate(2538) FIXME: Type 'unknown' cannot be used as an index type.
  const Component = Components[assessmentType]

  if (!Component) {
    return null
  }

  return <div className="app-view__content">{React.createElement(Component)}</div>
}

export default AssessmentHome
