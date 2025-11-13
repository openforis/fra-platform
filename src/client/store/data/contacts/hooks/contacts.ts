import { CountryIso } from 'meta/area/countryIso'
import { Contact } from 'meta/cycleData/contact/contact'

import { ContactsSelectors } from 'client/store/data/contacts/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type Returned = Array<Contact>

export const useContacts = (): Returned => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector<Returned>((state) =>
    ContactsSelectors.getContacts(state, assessmentName, cycleName, countryIso)
  )
}
