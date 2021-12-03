type AssessmentProps = {
  name: string // fra or pan_european
}

export interface Assessment {
  id: number
  uuid: string
  props: AssessmentProps
}
