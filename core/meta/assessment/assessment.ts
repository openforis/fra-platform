import { Cycle } from '@core/meta/assessment/cycle'
import { AssessmentName } from '@core/meta/assessment/assessmentName'

type AssessmentProps = {
  name: AssessmentName // fra or pan_european
}

export interface Assessment {
  id: number
  uuid: string
  cycles: Array<Cycle>
  props: AssessmentProps
}
