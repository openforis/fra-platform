import React from 'react'
import PropTypes from 'prop-types'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

import ExtentOfForest from '@webapp/app/assessment/components/section/components/customHeader/extentOfForest'
import ForestCharacteristics from '@webapp/app/assessment/components/section/components/customHeader/forestCharacteristics'

const components = {
  [FRA.type]: {
    [FRA.sections['1'].children.a.name]: ExtentOfForest,
    [FRA.sections['1'].children.b.name]: ForestCharacteristics,
  },
}

const CustomHeader = (props: any) => {
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
