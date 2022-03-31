import { Row } from '@meta/assessment'

const getDataReviewTopicKey = (row: Row): string => row.uuid

export const Topics = {
  getDataReviewTopicKey,
}
