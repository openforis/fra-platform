import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { Contact, ContactField } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

type Returned = () => void

export const useOnClick = (contact: Contact): Returned => {
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const { uuid } = contact

  return useCallback<Returned>(() => {
    const user = contact[ContactField.name].value.raw
    if (window.confirm(t('userManagement.confirmDelete', { user }))) {
      const deleteParams = { uuid, assessmentName, cycleName, countryIso, sectionName }
      dispatch(DataActions.deleteContact(deleteParams))
    }
  }, [assessmentName, contact, countryIso, cycleName, dispatch, sectionName, t, uuid])
}
