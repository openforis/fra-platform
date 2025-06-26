import React from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { useHistoryActivitiesIsActive } from 'client/store/data/history/hooks/activities'
import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks/auth'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { useSectionContext } from 'client/pages/Section/context'
import { useToggleEdit } from 'client/pages/Section/Descriptions/CommentableDescription/Title/hooks/useToggleEdit'

type Props = {
  name: CommentableDescriptionName
}

const ButtonEdit: React.FC<Props> = (props) => {
  const { name } = props

  const { t } = useTranslation()
  const { sectionName } = useSectionContext()
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
