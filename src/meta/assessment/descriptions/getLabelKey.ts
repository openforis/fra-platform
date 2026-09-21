import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

type Props = {
  assessment: Assessment
  name: CommentableDescriptionName
}

export const getLabelKey = (props: Props): string => {
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
