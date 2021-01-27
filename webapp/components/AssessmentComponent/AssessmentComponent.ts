import React from 'react'
import PropTypes from 'prop-types'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as Fra from '@common/assessment/fra'

import { useIsAssessment } from '@webapp/components/hooks'
import { useAssessmentType } from '@webapp/store/app'

const AssessmentComponent = (props: any) => {
  const isAssessment = useIsAssessment()
  const assessmentType = useAssessmentType()

  const { components, defaultKey, ...otherProps } = props
  const key = isAssessment ? assessmentType : defaultKey

  return React.createElement(components[key], otherProps)
}

AssessmentComponent.propTypes = {
  components: PropTypes.objectOf(PropTypes.elementType).isRequired,
  defaultKey: PropTypes.string,
}

AssessmentComponent.defaultProps = {
  defaultKey: Fra.type,
}

export default AssessmentComponent
