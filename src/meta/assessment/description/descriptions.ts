import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

type GetLabelKeyProps = {
  isPanEuropean: boolean
  name: CommentableDescriptionName
}

const getI18nCommentableDescriptionLabelKey = (props: GetLabelKeyProps): string => {
  const { isPanEuropean, name } = props
  switch (name) {
    case CommentableDescriptionName.dataSources:
      return 'description.dataSourcesPlus'
    case CommentableDescriptionName.generalComments:
      return isPanEuropean ? 'panEuropean.panEuCommentsTitle' : 'description.generalCommentsTitle'
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

export const Descriptions = {
  getI18nCommentableDescriptionLabelKey,
}
