import React from 'react'

import { AssessmentNames } from '@meta/assessment'

import { useAssessment } from '@client/store/assessment'
import { useIsAssessment } from '@client/hooks'

type Props = {
  components: Record<string, React.FC<{ query?: string }>>
  defaultKey?: string
  query?: string
}

const Placeholder: React.FC<{ query?: string }> = () => {
  return <div />
}

const AssessmentSwitch: React.FC<Props> = (props) => {
  const isAssessment = useIsAssessment()
  const assessment = useAssessment()

  const { components, defaultKey, ...otherProps } = props
  const key = isAssessment ? assessment?.props?.name : defaultKey

  const Component = components[key] ?? Placeholder
  return React.createElement(Component, otherProps)
}

AssessmentSwitch.defaultProps = {
  defaultKey: AssessmentNames.fra,
  query: null,
}

export default AssessmentSwitch
