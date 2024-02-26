import React from 'react'

import { AssessmentNames } from 'meta/assessment'

import { useAssessmentRouteParams } from 'client/hooks/useRouteParams'

import ExtentOfForest from './ExtentOfForest'
import ForestCharacteristics from './ForestCharacteristics'
import { Props } from './props'

const Components: Record<string, Record<string, React.FC<Props>>> = {
  [AssessmentNames.fra]: {
    extentOfForest: ExtentOfForest,
    forestCharacteristics: ForestCharacteristics,
  },
}

const SectionHeader: React.FC<Props> = (props) => {
  const { sectionName, disabled } = props

  const { assessmentName } = useAssessmentRouteParams()

  const Component = Components[assessmentName]?.[sectionName]

  if (!Component) {
    return null
  }

  return React.createElement(Component, { sectionName, disabled })
}

export default SectionHeader
