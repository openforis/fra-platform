import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { ContactValue } from 'meta/user/contact'

import { useAppDispatch } from 'client/store'
import { DataActions, useContacts } from 'client/store/data'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

export const useOnChange = () => {
  const { assessmentName, cycleName, countryIso: _countryIso, sectionName } = useSectionRouteParams()
  const countryIso = _countryIso as CountryIso
  const dispatch = useAppDispatch()
  const contacts = useContacts()

  return useCallback(
    (uuid: string, key: keyof ContactValue, value: any) => {
      if (!uuid) return // TODO: dispatch(DataActions.createContact(updateContactProps))

      const _contacts = contacts.map((_contact) =>
        _contact.uuid === uuid ? { ..._contact, value: { ..._contact.value, [key]: value } } : _contact
      )

      const contact = _contacts.find((_contact) => _contact.uuid === uuid)

      const updateContactProps = { contact, contacts: _contacts, countryIso, cycleName, assessmentName, sectionName }
      dispatch(DataActions.updateContact(updateContactProps))
    },
    [assessmentName, contacts, countryIso, cycleName, dispatch, sectionName]
  )
}
