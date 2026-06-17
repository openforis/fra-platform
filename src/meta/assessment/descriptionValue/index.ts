import { CountryIso } from 'meta/area/countryIso'
import { DataSource } from 'meta/assessment/descriptionValue/dataSource'
import { SectionName } from 'meta/assessment/section'
import { UUID } from 'meta/uuid/uuid'

export enum CommentableDescriptionName {
  dataSources = 'dataSources',
  generalComments = 'generalComments',
  nationalClassificationAndDefinitions = 'nationalClassificationAndDefinitions',
  originalData = 'originalData',
  reclassification = 'reclassification',
  estimationAndForecasting = 'estimationAndForecasting',
  introductoryText = 'introductoryText',
}

export interface CommentableDescriptionValue {
  text: string
  dataSources?: Array<DataSource>
}

export interface CommentableDescription {
  id: number
  countryIso: CountryIso
  sectionName: string
  sectionUuid?: UUID
  name: CommentableDescriptionName
  value: CommentableDescriptionValue
}

export type DescriptionIdentifier = {
  name: CommentableDescriptionName
  sectionName: SectionName
}

export type DescriptionValues = Record<CommentableDescriptionName, CommentableDescriptionValue>
export type DescriptionSectionValues = Record<SectionName, DescriptionValues>
export type DescriptionCountryValues = { [key in CountryIso]?: DescriptionSectionValues }
