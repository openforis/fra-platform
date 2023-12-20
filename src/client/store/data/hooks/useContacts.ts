import { useMemo } from 'react'

import { CountryIso } from 'meta/area'
import { Contact, Contacts } from 'meta/cycleData'

import { useAppSelector } from 'client/store/store'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  canEdit?: boolean
}

type Returned = Array<Contact>

export const useContacts = (props: Props): Returned => {
  const { canEdit } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  const contacts = useAppSelector((state) => state.data.contacts[assessmentName]?.[cycleName]?.[countryIso] ?? [])

  return useMemo<Returned>(() => {
    const lastPlaceholder = contacts.at(-1)?.placeholder

    return canEdit && !lastPlaceholder
      ? [...contacts, Contacts.newContact({ countryIso, rowIndex: contacts.length })]
      : contacts
  }, [canEdit, contacts, countryIso])
}
