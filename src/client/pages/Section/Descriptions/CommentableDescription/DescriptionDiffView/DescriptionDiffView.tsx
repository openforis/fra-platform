import React from 'react'

import { CommentableDescriptionName } from 'meta/assessment'

import { useCommentableDescriptionValue, useLastApprovedHistoryDescriptions } from 'client/store/data'
import DiffDOM from 'client/components/DiffDOM'
import { useSectionContext } from 'client/pages/Section/context'

type Props = { name: CommentableDescriptionName }

const DescriptionDiffView: React.FC<Props> = (props) => {
  const { name } = props
  const { sectionName } = useSectionContext()

  const descriptions = useLastApprovedHistoryDescriptions()
  // TODO: Support data sources after 2020
  const prev = descriptions?.[name]?.text || ''
  const current = useCommentableDescriptionValue({ name, sectionName })?.text || ''

  return <DiffDOM current={current} prev={prev} />
}

export default DescriptionDiffView
