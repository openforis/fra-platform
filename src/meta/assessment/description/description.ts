import { CycleUuid } from '../cycle'
import { AnalysisAndProcessingDescription } from './analysisAndProcessingDescription'
import { NationalDataDescription } from './nationalDataDescription'

export interface Description {
  analysisAndProcessing?: AnalysisAndProcessingDescription
  comments?: boolean
  introductoryText?: boolean
  nationalData?: NationalDataDescription
}

export type Descriptions = Record<CycleUuid, Description>
