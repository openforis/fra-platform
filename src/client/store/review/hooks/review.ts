import { ReviewStatus } from 'meta/assessment/review'
import { MessageTopicStatus } from 'meta/messageCenter/messageTopic'
import { Topics } from 'meta/messageCenter/topics'
import { UUID } from 'meta/uuid/uuid'

import { useAppSelector } from 'client/store/hooks'
import { ReviewSelectors } from 'client/store/review/selectors'

export const useReviewStatus = (key: string): ReviewStatus =>
  useAppSelector((state) => ReviewSelectors.getStatus(state, key) || ({} as ReviewStatus))

export const useOdpReviewSummary = (odpId: number): ReviewStatus => {
  const statuses = useAppSelector(ReviewSelectors.getStatuses)

  return statuses.reduce(
    (acc, curr) =>
      curr.key.startsWith(Topics.getOdpReviewTopicKeyPrefix(odpId))
        ? {
            hasUnreadMessages: curr.hasUnreadMessages || acc.hasUnreadMessages,
            status: curr.status !== MessageTopicStatus.resolved ? MessageTopicStatus.opened : acc.status,
          }
        : acc,
    {
      hasUnreadMessages: false,
      status: MessageTopicStatus.resolved,
    }
  )
}

export const useSectionReviewSummary = (sectionUuid: UUID): ReviewStatus => {
  const sections = useAppSelector((state) => ReviewSelectors.getSummariesBySectionUuid(state, sectionUuid))

  return sections.reduce(
    (curr, acc) => {
      return {
        hasUnreadMessages: curr.hasUnreadMessages || acc.hasUnreadMessages,
        status: curr.status !== MessageTopicStatus.resolved ? MessageTopicStatus.opened : acc.status,
      }
    },
    {
      hasUnreadMessages: false,
      status: MessageTopicStatus.resolved,
    }
  )
}
