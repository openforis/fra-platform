import { CountryIso } from 'meta/area/countryIso'
import { DataSourceDescription } from 'meta/assessment/description'
import { SectionName } from 'meta/assessment/section'

export type DataSourceLinked = {
  data: DataSource
  meta: DataSourceDescription
}
export enum CommentableDescriptionName {
  dataSources = 'dataSources',
  generalComments = 'generalComments',
  nationalClassificationAndDefinitions = 'nationalClassificationAndDefinitions',
  originalData = 'originalData',
  reclassification = 'reclassification',
  estimationAndForecasting = 'estimationAndForecasting',
  introductoryText = 'introductoryText',
}

export interface DataSource {
  comments: string
  placeholder?: boolean
  reference: string
  type: string
  uuid?: string
  variables?: Array<string>
  year: Array<string>
}

export interface CommentableDescriptionValue {
  text: string
  dataSources?: Array<DataSource>
}

export interface CommentableDescription {
  id: number
  countryIso: CountryIso
  sectionName: string
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
