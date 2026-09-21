import './Description.scss'
import React from 'react'

import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'

import {
  useAreDescriptionsFetched,
  useCommentableDescriptionValue,
} from 'client/store/data/descriptions/hooks/descriptions'
import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { useHistoryLastApprovedDescriptionFetched } from 'client/store/data/history/hooks/lastApprovedDescriptions'
import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks/auth'
import { useIsPrintRoute } from 'client/hooks/routes'
import { DataCell, DataGrid, DataRow } from 'client/components/DataGrid'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import { useSectionContext } from 'client/pages/Section/context'
import Title from 'client/pages/Section/Descriptions/Title'

import { useDescriptionErrorState } from './hooks/useDescriptionErrorState'
import { useOnChange } from './hooks/useOnChange'
import { useValidationErrors } from './hooks/useValidationErrors'
import DescriptionDiffView from './DescriptionDiffView'

type Props = {
  name: CommentableDescriptionName
  repository?: boolean
  template?: CommentableDescriptionValue
  title: string
}

const CommentableDescription: React.FC<Props> = (props) => {
  const { name, repository, template = { text: '' }, title } = props
  const { print } = useIsPrintRoute()
  const { sectionName } = useSectionContext()
  const value = useCommentableDescriptionValue({ name, sectionName, template })
  const descriptionsFetched = useAreDescriptionsFetched({ sectionName })
  const { empty } = useDescriptionErrorState({ name, sectionName })
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()
  const historyLastApprovedDescriptionFetched = useHistoryLastApprovedDescriptionFetched()
  const displayHistory = historyLastApprovedIsActive && historyLastApprovedDescriptionFetched && descriptionsFetched

  const canEdit = useCanEditDescription({ sectionName })
  const editable = useIsDescriptionEditable({ sectionName, name })
  const onChange = useOnChange({ sectionName, name })
  const validationErrors = useValidationErrors({ name, sectionName })

  return (
    <DataGrid className="description" withActions={canEdit}>
      <Title name={name} sectionName={sectionName} title={title} />

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
              validationErrors={validationErrors}
              value={empty && print ? '-' : value.text}
            />
          )}
        </DataCell>
      </DataRow>
    </DataGrid>
  )
}

export default CommentableDescription
