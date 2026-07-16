import { UUID } from 'meta/uuid/uuid'

import { useSummarySectionHasErrors, useSummarySubSectionHasErrors } from 'client/store/data/validations/hooks/summary'

type Props = {
  target: 'section' | 'subSection'
  uuid: UUID
}

export const useShow = (props: Props): boolean => {
  const { target, uuid } = props

  const sectionUuid = target === 'section' ? uuid : undefined
  const subSectionUuid = target === 'subSection' ? uuid : undefined

  const summarySectionHasErrors = useSummarySectionHasErrors(sectionUuid)
  const summarySubSectionHasErrors = useSummarySubSectionHasErrors(subSectionUuid)

  if (target === 'section') return summarySectionHasErrors
  return summarySubSectionHasErrors
}
