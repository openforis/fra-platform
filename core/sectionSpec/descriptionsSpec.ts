export type DescriptionSpec = (state: any) => boolean | boolean

export interface DescriptionsSpec {
  analysisAndProcessing: DescriptionSpec
  introductoryText: DescriptionSpec
  nationalData: DescriptionSpec
}
