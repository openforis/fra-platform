import './AssessmentHome.scss'
import React from 'react'

import { AssessmentName } from '@meta/assessment'

import { useAssessment } from '@client/store/assessment'
import MessageCenter from '@client/components/MessageCenter'

import FraHome from './FraHome'

const Components: Record<string, React.FC> = {
  [AssessmentName.fra]: FraHome,
  [AssessmentName.panEuropean]: () => <div />,
}

const AssessmentHome: React.FC = () => {
  const assessment = useAssessment()
  const Component = Components[assessment.props.name]

  if (!Component) {
    return null
  }

  return (
    <>
      <MessageCenter />
      <div className="app-view__content">
        <Component />
      </div>
    </>
  )
}

export default AssessmentHome
