import { CountryIso } from 'meta/area/countryIso'
import { DataSourceDescription } from 'meta/assessment/description'
import { SectionName } from 'meta/assessment/section'
import { UUID } from 'meta/uuid/uuid'

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
  uuid: UUID
  variables?: Array<string>
  year?: Array<string>
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
export type DescriptionCountryValues = { [key in CountryIso]?: DescriptionSectionValues }
