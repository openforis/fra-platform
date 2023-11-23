import { AreaCode } from 'meta/area'
import { AssessmentFile } from 'meta/cycleData'

export type BaseState = {
  [key in AreaCode | 'globals']?: Array<AssessmentFile>
}

export interface AssessmentFilesState extends BaseState {
  loading: boolean
}
