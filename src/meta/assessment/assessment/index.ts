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

export interface Assessment {
  cycleIndexesByName: Record<CycleName, number>
  cycleIndexesByUuid: Record<CycleUuid, number>
  cycles: Array<Cycle>
  id: number
  metaCache?: Record<CycleUuid, AssessmentMetaCache>
  props: AssessmentProps
  uuid: string
}

export type RecordAssessments = Record<AssessmentName, Assessment>
