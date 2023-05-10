import { AssessmentMetaCache } from './assessmentMetaCache'
import { AssessmentName } from './assessmentName'
import { Cycle, CycleUuid } from './cycle'

export type AssessmentProps = {
  name: AssessmentName
  defaultCycle?: string
}

export interface Assessment {
  id: number
  uuid: string
  cycles: Array<Cycle>
  props: AssessmentProps
  metaCache?: Record<CycleUuid, AssessmentMetaCache>
}
