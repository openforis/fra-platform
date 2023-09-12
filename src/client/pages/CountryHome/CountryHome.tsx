import './CountryHome.scss'
import React from 'react'

import { AssessmentNames } from 'meta/assessment'

import { useAssessment } from 'client/store/assessment'
import MessageCenter from 'client/components/MessageCenter'

import FraHome from './FraHome'
import PanEuropeanHome from './PanEuropeanHome'

const Components: Record<string, React.FC> = {
  [AssessmentNames.fra]: FraHome,
  [AssessmentNames.panEuropean]: PanEuropeanHome,
}

const CountryHome: React.FC = () => {
  const assessment = useAssessment()

  const Component = Components[assessment.props.name]

  if (!Component) return null

  return (
    <>
      <MessageCenter />
      <div className="app-view__content">
        <Component />
      </div>
    </>
  )
}

export default CountryHome
