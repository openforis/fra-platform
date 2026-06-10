import React from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import { useHistoryActivitiesIsActive } from 'client/store/data/history/hooks/activities'
import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks/auth'
import Button, { ButtonSize } from 'client/components/Buttons/Button'

import { useToggleEdit } from './hooks/useToggleEdit'

type Props = {
  name: CommentableDescriptionName
  sectionName: SectionName
}

const ButtonEdit: React.FC<Props> = (props) => {
  const { name, sectionName } = props

  const { t } = useTranslation()
  const canEdit = useCanEditDescription({ sectionName })
  const editable = useIsDescriptionEditable({ sectionName, name })
  const toggleEdit = useToggleEdit({ name, sectionName })
  const disabled = useHistoryActivitiesIsActive()

  if (!canEdit) return null

  return (
    <Button
      disabled={disabled}
      iconName="pencil"
      inverse={!editable}
      label={editable ? t('description.done') : t('description.edit')}
      onClick={toggleEdit}
      size={ButtonSize.xs}
    />
  )
}

export default ButtonEdit
