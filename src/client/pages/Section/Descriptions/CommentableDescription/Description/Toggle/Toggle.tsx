import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName, SectionName } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { AssessmentSectionActions, useIsDescriptionEditEnabled } from 'client/store/ui/assessmentSection'
import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks'

type Props = {
  sectionName: SectionName
  name: CommentableDescriptionName
}

const Toggle: React.FC<Props> = (props) => {
  const { sectionName, name } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const dataLocked = useIsDataLocked()
  const canEdit = useCanEditDescription({ sectionName })
  const editable = useIsDescriptionEditable({ sectionName, name })
  const editEnabled = useIsDescriptionEditEnabled({ sectionName, name })

  const toggleEdit = useCallback(() => {
    dispatch(AssessmentSectionActions.toggleEditDescription({ sectionName, name }))
  }, [dispatch, name, sectionName])

  useEffect(() => {
    if (editEnabled && dataLocked) {
      toggleEdit()
    }
  }, [dataLocked, editEnabled, toggleEdit])

  if (!canEdit) {
    return null
  }

  return (
    <span
      aria-label=""
      className="link fra-description__link no-print"
      onClick={toggleEdit}
      onKeyDown={toggleEdit}
      role="button"
      tabIndex={0}
    >
      {editable ? t('description.done') : t('description.edit')}
    </span>
  )
}

export default Toggle
