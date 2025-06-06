import React from 'react'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { useLastApprovedHistoryDescriptions } from 'client/store/data'
import { useCommentableDescriptionValue } from 'client/store/data/descriptions/hooks/descriptions'
import DiffDOM from 'client/components/DiffDOM'
import { useSectionContext } from 'client/pages/Section/context'

type Props = { name: CommentableDescriptionName }

const DescriptionDiffView: React.FC<Props> = (props) => {
  const { name } = props
  const { sectionName } = useSectionContext()

  const descriptions = useLastApprovedHistoryDescriptions()
  const prev = descriptions?.[name]?.text || ''
  const current = useCommentableDescriptionValue({ name, sectionName })?.text || ''

  return <DiffDOM current={current} prev={prev} />
}

export default DescriptionDiffView
