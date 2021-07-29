import React, { ReactNode } from 'react'

import { AssessmentType, FRA } from '@core/assessment'

import ExtentOfForest from './ExtentOfForest/ExtentOfForest'
import ForestCharacteristics from './ForestCharacteristics/ForestCharacteristics'

const Components: Record<string, Record<string, ReactNode>> = {
  [FRA.type]: {
    [FRA.sections['1'].children.a.name]: ExtentOfForest,
    [FRA.sections['1'].children.b.name]: ForestCharacteristics,
  },
}

type Props = {
  assessmentType: AssessmentType
  disabled: boolean
  sectionName: string
}

export const SectionHeader: React.FC<Props> = (props) => {
  const { assessmentType, sectionName, disabled } = props

  const Component = Components?.[assessmentType]?.[sectionName]

  if (!Component) {
    return null
  }

  // @ts-ignore
  return React.createElement(Component, { assessmentType, sectionName, disabled })
}
