import { CountryIso } from 'meta/area'
import { Contact } from 'meta/cycleData'

import { ContactsSelectors } from 'client/store/data/contacts/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Returned = Array<Contact>

export const useContacts = (): Returned => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector<Returned>((state) =>
    ContactsSelectors.getContacts(state, assessmentName, cycleName, countryIso)
  )
}
