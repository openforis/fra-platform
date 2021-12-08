import React from 'react'

import { useIsAssessment } from '@client/hooks'
import { AssessmentName } from '@core/meta/assessment'
import { useAssessment } from '@client/store/assessment'

type Props = {
  components: Record<string, React.FC<{ query?: string }>>
  defaultKey?: string
  query?: string
}

const AssessmentSwitch: React.FC<Props> = (props) => {
  const isAssessment = useIsAssessment()
  const assessment = useAssessment()

  const { components, defaultKey, ...otherProps } = props
  const key = isAssessment ? assessment.props.name : defaultKey

  return React.createElement(components[key], otherProps)
}

AssessmentSwitch.defaultProps = {
  defaultKey: AssessmentName.fra,
  query: null,
}

export default AssessmentSwitch
