import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogTarget } from 'meta/assessment/activityLog/target'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

export type NationalDataPointTargets = {
  [ActivityLogMessage.originalDataPointCreate]: OriginalDataPoint
  [ActivityLogMessage.originalDataPointRemove]: Pick<OriginalDataPoint, 'uuid' | 'year'>
  [ActivityLogMessage.originalDataPointUpdateCommentExtentOfForest]: OriginalDataPoint
  [ActivityLogMessage.originalDataPointUpdateCommentForestCharacteristics]: OriginalDataPoint
  [ActivityLogMessage.originalDataPointUpdateDataSources]: OriginalDataPoint
  [ActivityLogMessage.originalDataPointUpdateNationalClasses]: OriginalDataPoint
  [ActivityLogMessage.originalDataPointUpdateOriginalData]: OriginalDataPoint
  [ActivityLogMessage.originalDataPointUpdateYear]: OriginalDataPoint
}

export type ActivityLogNDPCreate = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.originalDataPointCreate>,
  ActivityLogMessage.originalDataPointCreate
>

export type ActivityLogNDPRemove = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.originalDataPointRemove>,
  ActivityLogMessage.originalDataPointRemove
>

type NDPUpdateMessage =
  | ActivityLogMessage.originalDataPointUpdateCommentExtentOfForest
  | ActivityLogMessage.originalDataPointUpdateCommentForestCharacteristics
  | ActivityLogMessage.originalDataPointUpdateDataSources
  | ActivityLogMessage.originalDataPointUpdateNationalClasses
  | ActivityLogMessage.originalDataPointUpdateOriginalData
  | ActivityLogMessage.originalDataPointUpdateYear
export type ActivityLogNDPUpdate = ActivityLog<ActivityLogTarget<NDPUpdateMessage>, NDPUpdateMessage>
