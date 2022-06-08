import { AssessmentMetaCache } from './assessmentMetaCache'
import { AssessmentName } from './assessmentName'
import { Cycle } from './cycle'

type AssessmentProps = {
  name: AssessmentName // fra or pan_european
  defaultCycle?: string
}

export interface Assessment {
  id: number
  uuid: string
  cycles: Array<Cycle>
  props: AssessmentProps
  metaCache?: AssessmentMetaCache
}
