import { ActivityLogMessage } from 'meta/assessment'

export const acceptedMessages = [
  ActivityLogMessage.assessmentStatusUpdate,
  ActivityLogMessage.contactCreate,
  ActivityLogMessage.descriptionUpdate,
  ActivityLogMessage.invitationAccept,
  ActivityLogMessage.invitationAdd,
  ActivityLogMessage.invitationRemove,
  ActivityLogMessage.messageCreate,
  ActivityLogMessage.nodeValueUpdate,
  ActivityLogMessage.originalDataPointCreate,
  ActivityLogMessage.originalDataPointRemove,
  ActivityLogMessage.originalDataPointUpdate,
  ActivityLogMessage.originalDataPointUpdateDataSources,
  ActivityLogMessage.originalDataPointUpdateDescription,
  ActivityLogMessage.originalDataPointUpdateNationalClasses,
  ActivityLogMessage.originalDataPointUpdateOriginalData,
  ActivityLogMessage.originalDataPointUpdateYear,
  ActivityLogMessage.topicStatusChange,
]
