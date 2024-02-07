import { CountryIso } from 'meta/area'
import { DataSourceDescription } from 'meta/assessment/description'
import { SectionName } from 'meta/assessment/section'

// TODO: merge this with description

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
  uuid?: string
  reference: string
  type: string
  variables?: string[]
  year: string
  comments: string
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

export type DescriptionValues = Record<CommentableDescriptionName, CommentableDescriptionValue>
export type DescriptionSectionValues = Record<SectionName, DescriptionValues>
export type DescriptionCountryValues = Record<CountryIso, DescriptionSectionValues>
