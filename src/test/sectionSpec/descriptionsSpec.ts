// TODO: add state type

import { DataSourceLinkedVariable } from '../../meta/assessment'

export type DescriptionSpec = ((state: any) => boolean) | boolean

export interface DescriptionsSpec {
  analysisAndProcessing: DescriptionSpec
  comments: DescriptionSpec
  introductoryText: DescriptionSpec
  nationalData: DescriptionSpec
  linkedVariables?: Array<DataSourceLinkedVariable>
}
