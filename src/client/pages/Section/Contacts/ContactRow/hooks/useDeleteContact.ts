import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { Contact, ContactField } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  contact: Contact
}

type Returned = () => void

export const useDeleteContact = (props: Props): Returned => {
  const { contact } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams<CountryIso>()

  return useCallback<Returned>(() => {
    const user = `${contact[ContactField.name].value.raw} ${contact[ContactField.surname].value.raw}`
    if (window.confirm(t('userManagement.confirmDelete', { user }))) {
      const deleteParams = { contact, assessmentName, cycleName, countryIso, sectionName }
      dispatch(DataActions.deleteContact(deleteParams))
    }
  }, [assessmentName, contact, countryIso, cycleName, dispatch, sectionName, t])
}
