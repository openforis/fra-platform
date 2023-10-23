import { ActivityLogMessage } from 'meta/assessment'

export const acceptedMessages = [
  ActivityLogMessage.invitationAccept,
  ActivityLogMessage.invitationAdd,
  ActivityLogMessage.invitationRemove,
  ActivityLogMessage.descriptionUpdate,
  ActivityLogMessage.nodeValueUpdate,
  ActivityLogMessage.originalDataPointCreate,
  ActivityLogMessage.originalDataPointRemove,
  ActivityLogMessage.originalDataPointUpdate,
  ActivityLogMessage.originalDataPointUpdateDataSources,
  ActivityLogMessage.originalDataPointUpdateDescription,
  ActivityLogMessage.originalDataPointUpdateNationalClasses,
  ActivityLogMessage.originalDataPointUpdateOriginalData,
  ActivityLogMessage.originalDataPointUpdateYear,
  ActivityLogMessage.assessmentStatusUpdate,
  ActivityLogMessage.messageCreate,
  ActivityLogMessage.topicStatusChange,
]
