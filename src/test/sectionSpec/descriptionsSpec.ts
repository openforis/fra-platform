// TODO: add state type

export type DescriptionSpec = ((state: any) => boolean) | boolean

export interface DescriptionsSpec {
  analysisAndProcessing: DescriptionSpec
  comments: DescriptionSpec
  introductoryText: DescriptionSpec
  nationalData: DescriptionSpec
  linkedVariables?: Array<{
    assessmentName: string
    cycleName: string
    sectionName: string
    variableNames: Array<string>
  }>
}
