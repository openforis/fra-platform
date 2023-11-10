import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { ContactValue } from 'meta/contact'

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
      const commonProps = { countryIso, cycleName, assessmentName, sectionName }

      if (!uuid) {
        const contact = contacts.find((_contact) => !_contact.uuid)
        const _value = { ...contact.value, [key]: value }
        const props = { rowIndex: contacts.length - 1 }
        const newContact = { ...contact, value: _value, props }
        const _contacts = contacts.map((_contact) => (_contact.uuid ? _contact : newContact))
        const createContactProps = { ...commonProps, contact: newContact, contacts: _contacts }

        dispatch(DataActions.createContact(createContactProps))
        return
      }

      const _contacts = contacts.map((_contact) =>
        _contact.uuid === uuid ? { ..._contact, value: { ..._contact.value, [key]: value } } : _contact
      )

      const contact = _contacts.find((_contact) => _contact.uuid === uuid)
      const updateContactProps = { ...commonProps, contact, contacts: _contacts }
      dispatch(DataActions.updateContact(updateContactProps))
    },
    [assessmentName, contacts, countryIso, cycleName, dispatch, sectionName]
  )
}
