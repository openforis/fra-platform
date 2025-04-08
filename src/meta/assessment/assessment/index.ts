import { Cycle, CycleUuid } from 'meta/assessment/cycle'
import { AssessmentMetaCache } from 'meta/assessment/metaCache'

export type AssessmentName = string

export enum AssessmentNames {
  fra = 'fra',
  fraTest = 'fra_test',
  panEuropean = 'panEuropean',
}

export type AssessmentProps = {
  name: AssessmentName
  defaultCycle?: CycleUuid
  default?: boolean
}

export interface Assessment {
  id: number
  uuid: string
  cycles: Array<Cycle>
  props: AssessmentProps
  metaCache?: Record<CycleUuid, AssessmentMetaCache>
}

export type RecordAssessments = Record<AssessmentName, Assessment>
