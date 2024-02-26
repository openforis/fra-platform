import { useCallback, useEffect } from 'react'

import { CommentableDescriptionName, SectionName } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { AssessmentSectionActions, useIsDescriptionEditEnabled } from 'client/store/ui/assessmentSection'
import { useIsDataLocked } from 'client/store/ui/dataLock'

type Props = {
  name: CommentableDescriptionName
  sectionName: SectionName
}

type Returned = () => void

export const useToggleEdit = (props: Props) => {
  const { name, sectionName } = props

  const dispatch = useAppDispatch()
  const dataLocked = useIsDataLocked()
  const editEnabled = useIsDescriptionEditEnabled({ sectionName, name })

  const toggleEdit = useCallback<Returned>(() => {
    dispatch(AssessmentSectionActions.toggleEditDescription({ sectionName, name }))
  }, [dispatch, name, sectionName])

  useEffect(() => {
    if (editEnabled && dataLocked) {
      toggleEdit()
    }
  }, [dataLocked, editEnabled, toggleEdit])

  return toggleEdit
}
