import './Description.scss'
import React from 'react'

import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment'

import { useCommentableDescriptionValue } from 'client/store/data'
import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks'
import { DataCell, DataGrid, DataRow } from 'client/components/DataGrid'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import Title from 'client/pages/Section/Descriptions/CommentableDescription/Title'

import { useDescriptionActions } from './hooks/useDescriptionActions'
import { useDescriptionErrorState } from './hooks/useDescriptionErrorState'
import { useOnChange } from './hooks/useOnChange'

type Props = {
  name: CommentableDescriptionName
  sectionName: string
  showDashEmptyContent?: boolean
  template?: CommentableDescriptionValue
  title: string
}

const CommentableDescription: React.FC<Props> = (props) => {
  const { name, sectionName, showDashEmptyContent, template, title } = props

  const value = useCommentableDescriptionValue({ name, sectionName, template })
  const { empty } = useDescriptionErrorState({ name, sectionName })

  const canEdit = useCanEditDescription({ sectionName })
  const editable = useIsDescriptionEditable({ sectionName, name })
  const onChange = useOnChange({ sectionName, name })
  const actions = useDescriptionActions({ sectionName, name, title })

  return (
    <DataGrid className="description" gridTemplateColumns={`1fr${canEdit ? ' 32px' : ''}`}>
      <Title name={name} sectionName={sectionName} title={title} />
      {canEdit && <div />}

      <DataRow actions={actions}>
        <DataCell className="description__editor-container" editable={editable} lastCol lastRow noBorder={!editable}>
          <EditorWYSIWYG
            disabled={!editable}
            onChange={(content) => onChange({ ...value, text: content })}
            value={!editable && empty && showDashEmptyContent ? '-' : value.text}
          />
        </DataCell>
      </DataRow>
    </DataGrid>
  )
}

CommentableDescription.defaultProps = {
  showDashEmptyContent: false,
  template: { text: '' },
}

export default CommentableDescription
