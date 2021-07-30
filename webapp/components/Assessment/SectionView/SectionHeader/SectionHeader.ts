import React from 'react'

import { FRA } from '@core/assessment'

import ExtentOfForest from './ExtentOfForest'
import ForestCharacteristics from './ForestCharacteristics'
import { Props } from './props'

const Components: Record<string, Record<string, React.FC<Props>>> = {
  [FRA.type]: {
    [FRA.sections['1'].children.a.name]: ExtentOfForest,
    [FRA.sections['1'].children.b.name]: ForestCharacteristics,
  },
}

const SectionHeader: React.FC<Props> = (props) => {
  const { assessmentType, sectionName, disabled } = props

  const Component = Components[assessmentType]?.[sectionName]

  if (!Component) {
    return null
  }

  return React.createElement(Component, { assessmentType, sectionName, disabled })
}

export default SectionHeader
