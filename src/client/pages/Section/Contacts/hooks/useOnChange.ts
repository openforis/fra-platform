import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { ContactProps } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { DataActions, useContacts } from 'client/store/data'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

export const useOnChange = () => {
  const { assessmentName, cycleName, countryIso: _countryIso, sectionName } = useSectionRouteParams()
  const countryIso = _countryIso as CountryIso
  const dispatch = useAppDispatch()
  const contacts = useContacts()

  return useCallback(
    (uuid: string, key: keyof ContactProps, value: any) => {
      const index = contacts.findIndex((contact) => contact.uuid === uuid)
      if (index === -1) return

      const contact = contacts[index]

      const _value = { ...contact.value, [key]: value }
      const updatedContact = { ...contact, value: _value }

      const updatedContacts = [...contacts]
      updatedContacts[index] = updatedContact
      const updateContactsProps = { assessmentName, cycleName, countryIso, sectionName, contacts: updatedContacts }

      dispatch(DataActions.updateContacts(updateContactsProps))
    },
    [assessmentName, contacts, countryIso, cycleName, dispatch, sectionName]
  )
}
