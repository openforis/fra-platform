import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName, SectionNames } from 'meta/assessment/section'

type GetLabelKeyProps = {
  assessment: Assessment
  name: CommentableDescriptionName
}

const getLabelKey = (props: GetLabelKeyProps): string => {
  const { assessment, name } = props
  switch (name) {
    case CommentableDescriptionName.dataSources:
      return 'description.dataSourcesPlus'
    case CommentableDescriptionName.generalComments:
      return assessment.props.name === AssessmentNames.panEuropean
        ? 'panEuropean.panEuCommentsTitle'
        : 'description.generalCommentsTitle'
    case CommentableDescriptionName.nationalClassificationAndDefinitions:
      return 'description.nationalClassificationAndDefinitions'
    case CommentableDescriptionName.originalData:
      return 'description.originalData'
    case CommentableDescriptionName.reclassification:
      return 'description.reclassification'
    case CommentableDescriptionName.estimationAndForecasting:
      return 'description.estimationAndForecasting'
    case CommentableDescriptionName.introductoryText:
      return 'contactPersons.introductoryText'
    default:
      return ''
  }
}

type OnlyCommentsProps = {
  hasNationalDataPointData: boolean
  sectionName: SectionName
  useNationalDataPoint: boolean
}

// Descriptions that remain visible when a section shows only comments
const commentDescriptionNames = [
  CommentableDescriptionName.generalComments,
  CommentableDescriptionName.introductoryText,
]

// A section shows only comments when its data comes from national data points
const isOnlyComments = (props: OnlyCommentsProps): boolean => {
  const { hasNationalDataPointData, sectionName, useNationalDataPoint } = props

  if (sectionName === SectionNames.extentOfForest) return hasNationalDataPointData
  if (sectionName === SectionNames.forestCharacteristics) return hasNationalDataPointData && useNationalDataPoint
  return false
}

const getVisibleDescriptionNames = (props: OnlyCommentsProps): Array<CommentableDescriptionName> => {
  if (isOnlyComments(props)) return commentDescriptionNames
  return Object.values(CommentableDescriptionName)
}

export const Descriptions = {
  getLabelKey,
  getVisibleDescriptionNames,
  isOnlyComments,
}
