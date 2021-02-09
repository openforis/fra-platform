import React from 'react'
import * as PropTypes from 'prop-types'
import * as assert from 'assert'

import FRA from '@common/assessment/fra'

import { useIsAssessment } from '@webapp/components/hooks'
import { useAssessmentType } from '@webapp/store/app'


type Props = { components: { [key: string]: React.Component }, defaultKey: string, query? : any}

const AssessmentComponent = (props: Props) => {
  const isAssessment = useIsAssessment()
  const assessmentType = useAssessmentType()

  const { components, defaultKey, ...otherProps } = props
  const key = isAssessment ? assessmentType : defaultKey

  assert.ok(key !== 'en', key)
  console.log(components[key], components, key)

  return React.createElement(components[key] as any, otherProps)
}

AssessmentComponent.propTypes = {
  components: PropTypes.objectOf(PropTypes.elementType).isRequired,
  defaultKey: PropTypes.string,
}

AssessmentComponent.defaultProps = {
  defaultKey: FRA.type,
}

export default AssessmentComponent
