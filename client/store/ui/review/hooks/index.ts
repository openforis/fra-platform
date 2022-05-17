import { ReviewStatus, Section } from '@meta/assessment'
import { MessageTopicStatus } from '@meta/messageCenter'

import { useAppSelector } from '@client/store'

const filterBySection = (section: Section) =>
  useAppSelector((state) => state.ui.review.summary.filter((reviewSummary) => reviewSummary.parentId === section.id))

export const useReviewStatus = (key: string): ReviewStatus =>
  useAppSelector((state) => state.ui.review.statuses[key] || ({} as ReviewStatus))

export const useSectionReviewSummary = (section: Section): ReviewStatus => {
  const sections = filterBySection(section)

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
