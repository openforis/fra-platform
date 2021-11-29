import { Cycle } from '@core/meta/cycle'

type AssessmentProps = {
  name: string // fra or pan_european
}

export interface Assessment {
  id: number
  uuid: string
  cycles: Array<Cycle>
  props: AssessmentProps
}
