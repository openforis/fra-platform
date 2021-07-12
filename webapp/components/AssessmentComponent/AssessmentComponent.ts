import React from 'react'
// import * as assert from 'assert'

import FRA from '@common/assessment/fra'

import { useIsAssessment } from '@webapp/components/hooks'
import { useAssessmentType } from '@webapp/store/app'

type Props = {
  components: { [key: string]: React.FC<{ query?: string }> }
  defaultKey?: string
  query?: string
}

const AssessmentComponent: React.FC<Props> = (props: Props) => {
  const isAssessment = useIsAssessment()
  const assessmentType = useAssessmentType()

  const { components, defaultKey, ...otherProps } = props
  const key = isAssessment ? assessmentType : defaultKey

  // assert.ok(key !== 'en', key)

  return React.createElement(components[key], otherProps)
}

AssessmentComponent.defaultProps = {
  defaultKey: FRA.type,
  query: null,
}

export default AssessmentComponent
