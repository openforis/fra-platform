import { ActivityLogMessage } from 'meta/assessment/activityLog'

export const activitiesLastEdit = [
  ActivityLogMessage.contactCreate,
  ActivityLogMessage.contactUpdate,
  ActivityLogMessage.contactDelete,
  ActivityLogMessage.descriptionUpdate,
  ActivityLogMessage.nodeValueCalculatedUpdate,
  ActivityLogMessage.nodeValueUpdate,
  ActivityLogMessage.originalDataPointCreate,
  ActivityLogMessage.originalDataPointRemove,
  ActivityLogMessage.originalDataPointUpdate,
  ActivityLogMessage.originalDataPointUpdateDataSources,
  ActivityLogMessage.originalDataPointUpdateCommentExtentOfForest,
  ActivityLogMessage.originalDataPointUpdateCommentForestCharacteristics,
  ActivityLogMessage.originalDataPointUpdateNationalClasses,
  ActivityLogMessage.originalDataPointUpdateOriginalData,
  ActivityLogMessage.originalDataPointUpdateYear,
  ActivityLogMessage.repositoryItemCreate,
  ActivityLogMessage.repositoryItemDelete,
  ActivityLogMessage.repositoryItemUpdate,
  ActivityLogMessage.tableValuesClear,
]
  .map((a) => `'${a}'`)
  .join(',')

export const activitiesLastEditOdpData = [
  ActivityLogMessage.originalDataPointCreate,
  ActivityLogMessage.originalDataPointRemove,
  ActivityLogMessage.originalDataPointUpdate,
  ActivityLogMessage.originalDataPointUpdateDataSources,
  ActivityLogMessage.originalDataPointUpdateCommentExtentOfForest,
  ActivityLogMessage.originalDataPointUpdateCommentForestCharacteristics,
  ActivityLogMessage.originalDataPointUpdateNationalClasses,
  ActivityLogMessage.originalDataPointUpdateOriginalData,
  ActivityLogMessage.originalDataPointUpdateYear,
]
  .map((a) => `'${a}'`)
  .join(',')
