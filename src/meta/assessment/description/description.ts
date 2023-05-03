import { CycleUuid } from '../cycle'
import { AnalysisAndProcessingDescription } from './analysisAndProcessingDescription'
import { NationalDataDescription } from './nationalDataDescription'

export interface Description {
  analysisAndProcessing?: AnalysisAndProcessingDescription
  nationalData?: NationalDataDescription

  comments?: boolean
  introductoryText?: boolean
}

export type Descriptions = Record<CycleUuid, Description>
