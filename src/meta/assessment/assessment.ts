import { AssessmentMetaCache } from './assessmentMetaCache'
import { AssessmentName } from './assessmentName'
import { Cycle, CycleUuid } from './cycle'

export type AssessmentProps = {
  name: AssessmentName
  defaultCycle?: CycleUuid
}

export type AssessmentUuid = string

export interface Assessment {
  id: number
  uuid: AssessmentUuid
  cycles: Array<Cycle>
  props: AssessmentProps
  metaCache?: Record<CycleUuid, AssessmentMetaCache>
}
