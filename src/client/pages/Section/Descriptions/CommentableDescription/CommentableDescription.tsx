import './Description.scss'
import React from 'react'

import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment'

import { useCommentableDescriptionValue } from 'client/store/data'
import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks'
import { DataCell, DataGrid, DataRow } from 'client/components/DataGrid'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import { useSectionContext } from 'client/pages/Section/context'
import Title from 'client/pages/Section/Descriptions/CommentableDescription/Title'

import { useDescriptionErrorState } from './hooks/useDescriptionErrorState'
import { useOnChange } from './hooks/useOnChange'

type Props = {
  name: CommentableDescriptionName
  repository?: boolean
  showDashEmptyContent?: boolean
  template?: CommentableDescriptionValue
  title: string
}

const CommentableDescription: React.FC<Props> = (props) => {
  const { name, showDashEmptyContent, repository, template, title } = props

  const { sectionName } = useSectionContext()
  const value = useCommentableDescriptionValue({ name, sectionName, template })
  const { empty } = useDescriptionErrorState({ name, sectionName })

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
          <EditorWYSIWYG
            disabled={!editable}
            onChange={(content) => onChange({ ...value, text: content })}
            repository={repository}
            value={!editable && empty && showDashEmptyContent ? '-' : value.text}
          />
        </DataCell>
      </DataRow>
    </DataGrid>
  )
}

CommentableDescription.defaultProps = {
  repository: false,
  showDashEmptyContent: false,
  template: { text: '' },
}

export default CommentableDescription
