import React from 'react'

import { AssessmentName } from '@meta/assessment'
import ExtentOfForest from './ExtentOfForest'
import ForestCharacteristics from './ForestCharacteristics'
import { Props } from './props'

const Components: Record<string, Record<string, React.FC<Props>>> = {
  [AssessmentName.fra]: {
    extentOfForest: ExtentOfForest,
    forestCharacteristics: ForestCharacteristics,
  },
}

const SectionHeader: React.FC<Props> = (props) => {
  const { assessmentName, sectionName, disabled } = props

  const Component = Components[assessmentName]?.[sectionName]

  if (!Component) {
    return null
  }

  return React.createElement(Component, { assessmentName, sectionName, disabled })
}

export default SectionHeader
