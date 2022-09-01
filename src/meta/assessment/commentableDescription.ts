import { CountryIso } from '@meta/area'

export enum CommentableDescriptionName {
  dataSources = 'dataSources',
  generalComments = 'generalComments',
  nationalClassificationAndDefinitions = 'nationalClassificationAndDefinitions',
  originalData = 'originalData',
  reclassification = 'reclassification',
  estimationAndForecasting = 'estimationAndForecasting',
  introductoryText = 'introductoryText',
}

export interface CommentableDescription {
  id: number
  countryIso: CountryIso
  sectionName: string
  name: CommentableDescriptionName
  content: string
}
