import { ReviewStatus, Section } from '@meta/assessment'
import { MessageTopicStatus } from '@meta/messageCenter'

import { useAppSelector } from '@client/store'

export const useReviewStatus = (section: string, key: string): ReviewStatus =>
  useAppSelector((state) => state.ui.review[section][key] || ({} as ReviewStatus))

export const useSectionReviewStatus = (section: Section): ReviewStatus => {
  const subSectionNames = section?.subSections.map((subSection) => subSection.props.name) || []

  return subSectionNames.reduce((reviewStatus) => reviewStatus, {
    hasUnreadMessages: false,
    status: MessageTopicStatus.resolved,
  } as ReviewStatus)
}
