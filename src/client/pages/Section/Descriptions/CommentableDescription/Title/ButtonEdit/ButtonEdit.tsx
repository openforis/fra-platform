import React from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName } from 'meta/assessment'

import { useIsHistoryActive } from 'client/store/data'
import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks'
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
  const disabled = useIsHistoryActive()

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
