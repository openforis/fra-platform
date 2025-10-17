import React from 'react'

import { AssessmentNames } from 'meta/assessment/assessment'

import { useAssessmentRouteParams } from 'client/hooks/routeParams'

type Props = {
  components: Record<string, React.FC<{ query?: string }>>
  defaultKey?: string
  query?: string
}

const Placeholder: React.FC<{ query?: string }> = () => {
  return <div />
}

const AssessmentSwitch: React.FC<Props> = (props) => {
  const { components, defaultKey = AssessmentNames.fra, ...otherProps } = props

  const { assessmentName } = useAssessmentRouteParams()
  const key = assessmentName ?? defaultKey

  const Component = components[key] ?? Placeholder
  return React.createElement(Component, otherProps)
}

export default AssessmentSwitch
