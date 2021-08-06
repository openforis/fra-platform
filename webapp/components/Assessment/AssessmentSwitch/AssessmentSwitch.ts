import React from 'react'

import { FRA } from '@core/assessment'

import { useIsAssessment } from '@webapp/components/hooks'
import { useAssessmentType } from '@webapp/store/app'

type Props = {
  components: Record<string, React.FC<{ query?: string }>>
  defaultKey?: string
  query?: string
}

const AssessmentSwitch: React.FC<Props> = (props) => {
  const isAssessment = useIsAssessment()
  const assessmentType = useAssessmentType()

  const { components, defaultKey, ...otherProps } = props
  const key = isAssessment ? assessmentType : defaultKey

  return React.createElement(components[key], otherProps)
}

AssessmentSwitch.defaultProps = {
  defaultKey: FRA.type,
  query: null,
}

export default AssessmentSwitch
