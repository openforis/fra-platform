import './style.less'

import React from 'react'
import { useParams } from 'react-router'

import * as FRA from '@common/assessment/fra'

import FraPrintView from '@webapp/app/assessment/fra/print/fraPrintView'

const Components = {
  [FRA.type]: FraPrintView,
}

const AssessmentPrintView = () => {
  const { assessmentType } = useParams()
  const Component = Components[assessmentType]

  return <div className="fra-print__container">{React.createElement(Component)}</div>
}

export default AssessmentPrintView
