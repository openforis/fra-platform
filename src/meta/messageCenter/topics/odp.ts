export const getOdpReviewTopicKeyPrefix = (odpId: number | string): string => `odp-${odpId}-`

export const getOdpClassReviewTopicKey = (odpId: number, uuid: string, rowId: string): string =>
  `${getOdpReviewTopicKeyPrefix(odpId)}class-${uuid}-${rowId}`

export const getOdpReviewTopicKey = (odpId: number, rowId: string): string =>
  `${getOdpReviewTopicKeyPrefix(odpId)}${rowId}`
