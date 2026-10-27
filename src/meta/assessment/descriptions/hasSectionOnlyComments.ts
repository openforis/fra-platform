import { DescriptionVisibilityProps } from 'meta/assessment/descriptions/types'
import { SectionNames } from 'meta/assessment/section'

// A section shows only comments when its data comes from national data points
export const hasSectionOnlyComments = (props: DescriptionVisibilityProps): boolean => {
  const { hasNationalDataPointData, sectionName, useNationalDataPoint } = props

  if (sectionName === SectionNames.extentOfForest) return hasNationalDataPointData
  if (sectionName === SectionNames.forestCharacteristics) return hasNationalDataPointData && useNationalDataPoint
  return false
}
