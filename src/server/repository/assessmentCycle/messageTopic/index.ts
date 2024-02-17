import { create } from './create'
import { getOneOrNone } from './getOneOrNone'
import { removeOriginalDataPointTopics } from './removeOriginalDataPointTopics'
import { updateStatus } from './updateStatus'

export const MessageTopicRepository = {
  create,
  getOneOrNone,
  updateStatus,

  // odp
  removeOriginalDataPointTopics,
}
