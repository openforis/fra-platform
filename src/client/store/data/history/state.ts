import { ActivityLog } from 'meta/assessment/activityLog'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { DescriptionCountryValues } from 'meta/assessment/descriptionValue'
import { RecordAssessmentOriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { HistoryTarget } from 'meta/cycleData/history/activities'
import { RecordAssessmentData } from 'meta/data/recordData'

type DescriptionsState = Record<AssessmentName, Record<CycleName, DescriptionCountryValues>>

export type HistoryActivitiesItemState = {
  labelKey: string
  target: HistoryTarget
}

export type HistoryActivitiesState = {
  items?: Record<HistoryTarget, HistoryActivitiesItemState>
  compareItem?: Record<HistoryTarget, ActivityLog<never>>
}

export type HistoryLastApprovedState = {
  active?: boolean
  descriptions?: DescriptionsState
  originalDataPoints?: RecordAssessmentOriginalDataPoint
  tableData?: RecordAssessmentData
}

export type HistoryState = {
  activities?: HistoryActivitiesState
  lastApproved?: HistoryLastApprovedState
}

export const initialState: HistoryState = {}
