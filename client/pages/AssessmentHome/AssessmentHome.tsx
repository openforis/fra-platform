import './FraHome/fraHome.scss'
import React from 'react'

import { AssessmentName } from '@meta/assessment'

import { useAssessment } from '@client/store/assessment'

import FraHome from './FraHome'

const Components = {
  [AssessmentName.fra]: FraHome,
  [AssessmentName.panEuropean]: <div />,
}

const AssessmentHome: React.FC = () => {
  const assessment = useAssessment()
  // @ts-ignore
  const Component = Components[assessment.props.name]

  if (!Component) {
    return null
  }

  return <div className="app-view__content">{React.createElement(Component)}</div>
}

export default AssessmentHome
