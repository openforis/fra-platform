import React from 'react'
import PropTypes from 'prop-types'

import * as Fra from '@common/assessment/fra'

import { useIsAssessment } from '@webapp/components/hooks'
import { useAssessmentType } from '@webapp/store/app'

const AssessmentComponent = (props) => {
  const isAssessment = useIsAssessment()
  const assessmentType = useAssessmentType()

  const { components, defaultKey } = props
  const key = isAssessment ? assessmentType : defaultKey

  return React.createElement(components[key])
}

AssessmentComponent.propTypes = {
  components: PropTypes.objectOf(PropTypes.elementType).isRequired,
  defaultKey: PropTypes.string,
}

AssessmentComponent.defaultProps = {
  defaultKey: Fra.type,
}

export default AssessmentComponent
