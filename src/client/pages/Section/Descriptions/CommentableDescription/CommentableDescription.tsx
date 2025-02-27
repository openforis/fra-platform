import './Description.scss'
import React from 'react'

import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment'

import {
  useCommentableDescriptionValue,
  useHistoryLastApprovedDescriptionFetched,
  useHistoryLastApprovedIsActive,
} from 'client/store/data'
import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { DataCell, DataGrid, DataRow } from 'client/components/DataGrid'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import { useSectionContext } from 'client/pages/Section/context'
import Title from 'client/pages/Section/Descriptions/CommentableDescription/Title'

import { useDescriptionErrorState } from './hooks/useDescriptionErrorState'
import { useOnChange } from './hooks/useOnChange'
import DescriptionDiffView from './DescriptionDiffView'

type Props = {
  name: CommentableDescriptionName
  repository?: boolean
  template?: CommentableDescriptionValue
  title: string
}

const CommentableDescription: React.FC<Props> = (props) => {
  const { name, repository, template, title } = props
  const { print } = useIsPrintRoute()
  const { sectionName } = useSectionContext()
  const value = useCommentableDescriptionValue({ name, sectionName, template })
  const { empty } = useDescriptionErrorState({ name, sectionName })

  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()
  const historyLastApprovedDescriptionFetched = useHistoryLastApprovedDescriptionFetched()
  const displayHistory = historyLastApprovedIsActive && historyLastApprovedDescriptionFetched

  const canEdit = useCanEditDescription({ sectionName })
  const editable = useIsDescriptionEditable({ sectionName, name })
  const onChange = useOnChange({ sectionName, name })

  return (
    <DataGrid className="description" withActions={canEdit}>
      <Title name={name} title={title} />

      <DataRow>
        <DataCell
          className="description__editor-container"
          editable={editable}
          gridColumn={canEdit ? `1/3` : undefined}
          lastCol
          lastRow
          noBorder={!editable}
        >
          {displayHistory ? (
            <DescriptionDiffView name={name} />
          ) : (
            <EditorWYSIWYG
              disabled={!editable}
              onChange={(content) => onChange({ ...value, text: content })}
              repository={repository}
              value={empty && print ? '-' : value.text}
            />
          )}
        </DataCell>
      </DataRow>
    </DataGrid>
  )
}

CommentableDescription.defaultProps = {
  repository: false,
  template: { text: '' },
}

export default CommentableDescription
