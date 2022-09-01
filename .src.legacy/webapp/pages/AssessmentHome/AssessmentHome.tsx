import './FraHome/fraHome.scss'

import React from 'react'

import { FRA, PanEuropean } from '@core/assessment'

import { useAssessmentType } from '@webapp/store/app'

import FraHome from './FraHome'
import PanEuropeanHome from './PanEuropeanHome'

const Components = {
  [FRA.type]: FraHome,
  [PanEuropean.type]: PanEuropeanHome,
}

const AssessmentHome: React.FC = () => {
  const assessmentType = useAssessmentType()
  const Component = Components[assessmentType]

  if (!Component) {
    return null
  }

  return <div className="app-view__content">{React.createElement(Component)}</div>
}

export default AssessmentHome
