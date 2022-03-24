import { Row } from '@meta/assessment'

export type { Message } from './message'
export type { MessageTopic } from './messageTopic'

export { MessageTopicStatus } from './messageTopic'

const getDataReviewTopicKey = (row: Row): string => row.uuid

export const Topics = {
  getDataReviewTopicKey,
}
