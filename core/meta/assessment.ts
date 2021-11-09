import { CycledPropsObject } from '@core/meta/cycle'

type AssessmentProps = {
  name: string // fra or pan_european
}

export interface Assessment extends CycledPropsObject<AssessmentProps> {
  id: number
}
