import React from 'react'

import { CommentableDescriptionName } from 'meta/assessment'

import { useCommentableDescriptionValue, useLastApprovedHistoryDescriptions } from 'client/store/data'
import DiffText from 'client/components/DiffText'
import { useSectionContext } from 'client/pages/Section/context'
import useChanges from 'client/pages/Section/Descriptions/CommentableDescription/hooks/useChanges'

type Props = { name: CommentableDescriptionName }

const DescriptionDiffView: React.FC<Props> = (props) => {
  const { name } = props
  const { sectionName } = useSectionContext()

  const descriptions = useLastApprovedHistoryDescriptions()
  // TODO: Support data sources after 2020
  const descriptionA = descriptions?.[name]?.text || ''
  const descriptionB = useCommentableDescriptionValue({ name, sectionName })?.text || ''

  const changes = useChanges({ descriptionA, descriptionB })

  return <DiffText changes={changes} />
}

export default DescriptionDiffView
