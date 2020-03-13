import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import * as FRA from '@common/assessment/fra'

import ExtentOfForest from '@webapp/app/assessment/components/section/customHeader/extentOfForest'

const components = {
  [FRA.type]: {
    [FRA.sections['1'].children.a.name]: ExtentOfForest,
  },
}

const CustomHeader = props => {
  const { assessmentType, sectionName, disabled } = props
  const component = R.pathOr(null, [assessmentType, sectionName])(components)

  if (!component) {
    return null
  }

  return React.createElement(component, { assessmentType, sectionName, disabled })
}

CustomHeader.propTypes = {
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default CustomHeader
