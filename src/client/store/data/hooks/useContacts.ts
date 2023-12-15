import { CountryIso } from 'meta/area'
import { Contact } from 'meta/cycleData'

import { useAppSelector } from 'client/store/store'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useContacts = (): Array<Contact> => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  return useAppSelector((state) => state.data.contacts[assessmentName]?.[cycleName]?.[countryIso] ?? [])
}
