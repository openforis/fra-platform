import React from 'react'

import { AssessmentNames } from 'meta/assessment'

import { useAssessmentRouteParams } from 'client/hooks/useRouteParams'
import { useSectionContext } from 'client/pages/Section/context'

import ExtentOfForest from './ExtentOfForest'
import ForestCharacteristics from './ForestCharacteristics'

const Components: Record<string, Record<string, React.FC>> = {
  [AssessmentNames.fra]: {
    extentOfForest: ExtentOfForest,
    forestCharacteristics: ForestCharacteristics,
  },
}

const SectionHeader: React.FC = () => {
  const { sectionName } = useSectionContext()
  const { assessmentName } = useAssessmentRouteParams()

  const Component = Components[assessmentName]?.[sectionName]

  if (!Component) {
    return null
  }

  return <Component />
}

export default SectionHeader
