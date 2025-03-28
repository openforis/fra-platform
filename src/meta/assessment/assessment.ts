import { Cycle, CycleUuid } from 'meta/assessment/cycle'

import { AssessmentMetaCache } from './assessmentMetaCache'
import { AssessmentName } from './assessmentName'

export type AssessmentProps = {
  name: AssessmentName
  defaultCycle?: CycleUuid
}

export interface Assessment {
  id: number
  uuid: string
  cycles: Array<Cycle>
  props: AssessmentProps
  metaCache?: Record<CycleUuid, AssessmentMetaCache>
}

export type RecordAssessments = Record<AssessmentName, Assessment>
