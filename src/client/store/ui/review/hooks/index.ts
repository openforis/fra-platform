import { ReviewStatus } from '@meta/assessment'
import { MessageTopicStatus } from '@meta/messageCenter'

import { useAppSelector } from '@client/store'

export const useReviewStatus = (key: string): ReviewStatus =>
  useAppSelector((state) => state.ui.review.status[key] || ({} as ReviewStatus))

export const useOdpReviewSummary = (odpId: number): ReviewStatus => {
  const statuses = useAppSelector((state) => Object.values(Object.fromEntries(Object.entries(state.ui.review.status))))

  return statuses.reduce(
    (curr, acc) => {
      return curr.key.startsWith(`odp-${odpId}-`)
        ? {
            hasUnreadMessages: curr.hasUnreadMessages || acc.hasUnreadMessages,
            status: curr.status !== MessageTopicStatus.resolved ? MessageTopicStatus.opened : acc.status,
          }
        : acc
    },
    {
      hasUnreadMessages: false,
      status: MessageTopicStatus.resolved,
    }
  )
}

export const useSectionReviewSummary = (sectionId: number): ReviewStatus => {
  const sections = useAppSelector((state) =>
    state.ui.review.summary.filter(
      (reviewSummary) => reviewSummary.parentId === sectionId || reviewSummary.subSectionId === sectionId
    )
  )

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
