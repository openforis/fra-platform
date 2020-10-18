import './Fra/fra.less'

import React from 'react'

import { useAssessmentType } from '@webapp/components/hooks'
import * as FRA from '@common/assessment/fra'
import * as PanEuropean from '@common/assessment/panEuropean'

import Notfound from '@webapp/app/notfound'

import Fra from './Fra'
import PanEuropeanComponent from './PanEuropean'

const Components = {
  [FRA.type]: Fra,
  [PanEuropean.type]: PanEuropeanComponent,
}

const Assessment = () => {
  const assessmentType = useAssessmentType()
  const Component = Components[assessmentType]

  if (!Component) {
    return <Notfound />
  }

  return <div className="app-view__content">{React.createElement(Component)}</div>
}

export default Assessment
