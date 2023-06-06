import './style.scss'
import React, { memo } from 'react'

import { AssessmentNames } from 'meta/assessment'

import { useAssessment } from 'client/store/assessment'
import Loading from 'client/components/Loading'

import FraPrint from './FraPrint'

const Components: Record<string, React.FC> = {
  [AssessmentNames.fra]: FraPrint,
}

const AssessmentPrint: React.FC = () => {
  const assessment = useAssessment()

  if (!assessment) return <Loading />

  const Component = Components[assessment.props.name]

  return <div className="fra-print__container">{React.createElement(Component)}</div>
}

export default memo(AssessmentPrint)
