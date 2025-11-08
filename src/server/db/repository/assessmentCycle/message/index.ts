import { create } from 'server/db/repository/assessmentCycle/message/create'
import { markDeleted } from 'server/db/repository/assessmentCycle/message/markDeleted'

export const MessageRepository = {
  create,
  markDeleted,
}
