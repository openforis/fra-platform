import React from 'react'
import { useParams } from 'react-router-dom'

import { AssessmentNames } from 'meta/assessment'

type Props = {
  components: Record<string, React.FC<{ query?: string }>>
  defaultKey?: string
  query?: string
}

const Placeholder: React.FC<{ query?: string }> = () => {
  return <div />
}

const AssessmentSwitch: React.FC<Props> = (props) => {
  const { assessmentName } = useParams()

  const { components, defaultKey, ...otherProps } = props
  const key = assessmentName ?? defaultKey

  const Component = components[key] ?? Placeholder
  return React.createElement(Component, otherProps)
}

AssessmentSwitch.defaultProps = {
  defaultKey: AssessmentNames.fra,
  query: null,
}

export default AssessmentSwitch
