import { AnalysisAndProcessingDescription } from '@meta/assessment/description/analysisAndProcessingDescription'
import { NationalDataDescription } from '@meta/assessment/description/nationalDataDescription'

import { CycleUuid } from '../cycle'

export interface Description {
  analysisAndProcessing?: AnalysisAndProcessingDescription
  nationalData?: NationalDataDescription

  comments?: boolean
  introductoryText?: boolean
}

export type Descriptions = Record<CycleUuid, Description>
