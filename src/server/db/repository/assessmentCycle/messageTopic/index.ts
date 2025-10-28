import { create } from 'server/db/repository/assessmentCycle/messageTopic/create'
import { getOneOrNone } from 'server/db/repository/assessmentCycle/messageTopic/getOneOrNone'
import { removeMany } from 'server/db/repository/assessmentCycle/messageTopic/removeMany'
import { updateStatus } from 'server/db/repository/assessmentCycle/messageTopic/updateStatus'

export const MessageTopicRepository = {
  create,
  getOneOrNone,
  removeMany,
  updateStatus,
}
