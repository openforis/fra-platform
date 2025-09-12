import { Cycle, CycleName, CycleUuid } from 'meta/assessment/cycle'
import { AssessmentMetaCache } from 'meta/assessment/metaCache'

export type AssessmentName = string

export enum AssessmentNames {
  fra = 'fra',
  fraTest = 'fra_test',
  panEuropean = 'panEuropean',
}

export type AssessmentProps = {
  name: AssessmentName
  default?: boolean
}

export interface AssessmentBase {
  cycles: Array<Cycle>
  id: number
  props: AssessmentProps
  uuid: string
}

export type CycleIndexes = {
  name: Record<CycleName, number>
  uuid: Record<CycleUuid, number>
}

export interface Assessment extends AssessmentBase {
  cycleIndexes: CycleIndexes
  metaCache?: Record<CycleUuid, AssessmentMetaCache>
}

export type RecordAssessments = Record<AssessmentName, Assessment>
