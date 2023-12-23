import { ActivityLogMessage } from 'meta/assessment'

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
  ActivityLogMessage.originalDataPointUpdateDescription,
  ActivityLogMessage.originalDataPointUpdateNationalClasses,
  ActivityLogMessage.originalDataPointUpdateOriginalData,
  ActivityLogMessage.originalDataPointUpdateYear,
  ActivityLogMessage.tableValuesClear,
]
  .map((a) => `'${a}'`)
  .join(',')

export const activitiesLastEditOdpData = [
  ActivityLogMessage.originalDataPointCreate,
  ActivityLogMessage.originalDataPointRemove,
  ActivityLogMessage.originalDataPointUpdateOriginalData,
  ActivityLogMessage.originalDataPointUpdateYear,
]
  .map((a) => `'${a}'`)
  .join(',')
