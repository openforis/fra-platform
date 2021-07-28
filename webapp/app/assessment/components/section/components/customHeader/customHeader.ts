import React from 'react'
import * as PropTypes from 'prop-types'
import * as R from 'ramda'

import { FRA } from '@core/assessment'

import ExtentOfForest from '@webapp/app/assessment/components/section/components/customHeader/extentOfForest'
import ForestCharacteristics from '@webapp/app/assessment/components/section/components/customHeader/forestCharacteristics'

const Components: any = {
  [FRA.type]: {
    [FRA.sections['1'].children.a.name]: ExtentOfForest,
    [FRA.sections['1'].children.b.name]: ForestCharacteristics,
  },
}

const CustomHeader = (props: any) => {
  const { assessmentType, sectionName, disabled } = props
  const component = R.pathOr(null, [assessmentType, sectionName])(Components)

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
