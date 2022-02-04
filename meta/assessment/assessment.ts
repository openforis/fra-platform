import { Cycle } from './cycle'
import { AssessmentName } from './assessmentName'

type AssessmentProps = {
  name: AssessmentName // fra or pan_european
  defaultCycle?: string
}

export interface Assessment {
  id: number
  uuid: string
  cycles: Array<Cycle>
  props: AssessmentProps
}
