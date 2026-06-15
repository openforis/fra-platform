import { useCallback, useEffect } from 'react'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import { useAppDispatch } from 'client/store/hooks'
import { CountryReportActions } from 'client/store/ui/countryReport/actions'
import { useIsDataLocked } from 'client/store/ui/countryReport/hooks/datalock'
import { useIsDescriptionEditEnabled } from 'client/store/ui/countryReport/hooks/descriptions'

type Props = {
  name: CommentableDescriptionName
  sectionName: SectionName
}

type Returned = () => void

export const useToggleEdit = (props: Props): Returned => {
  const { name, sectionName } = props

  const dispatch = useAppDispatch()
  const dataLocked = useIsDataLocked()
  const editEnabled = useIsDescriptionEditEnabled({ sectionName, name })

  const toggleEdit = useCallback<Returned>(() => {
    dispatch(CountryReportActions.toggleEditDescription({ sectionName, name }))
  }, [dispatch, name, sectionName])

  useEffect(() => {
    if (editEnabled && dataLocked) {
      toggleEdit()
    }
  }, [dataLocked, editEnabled, toggleEdit])

  return toggleEdit
}
