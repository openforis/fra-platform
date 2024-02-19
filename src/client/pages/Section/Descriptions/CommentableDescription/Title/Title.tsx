import './Title.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName, SectionName } from 'meta/assessment'

import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { DataCell, DataRow } from 'client/components/DataGrid'

import { useDescriptionActions } from './hooks/useDescriptionActions'
import { useToggleEdit } from './hooks/useToggleEdit'

type Props = {
  name: CommentableDescriptionName
  sectionName: SectionName
  title: string
}

const Title: React.FC<Props> = (props) => {
  const { name, sectionName, title } = props

  const { t } = useTranslation()
  const canEdit = useCanEditDescription({ sectionName })
  const editable = useIsDescriptionEditable({ sectionName, name })
  const toggleEdit = useToggleEdit({ name, sectionName })
  const actions = useDescriptionActions({ sectionName, name, title })

  return (
    <DataRow actions={actions}>
      <DataCell className="description-title" editable noBorder>
        <h3 className="subhead">
          <span>{title}</span>
        </h3>

        {canEdit && (
          <Button
            inverse={!editable}
            label={editable ? t('description.done') : t('description.edit')}
            onClick={toggleEdit}
            size={ButtonSize.xs}
          />
        )}
      </DataCell>
    </DataRow>
  )
}

export default Title
