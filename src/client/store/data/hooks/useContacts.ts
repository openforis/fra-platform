import { CountryIso } from 'meta/area'

import { ContactState } from 'client/store/data/stateType'
import { useAppSelector } from 'client/store/store'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useContacts = (): ContactState => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  return useAppSelector(
    (state) =>
      state.data.contacts[assessmentName]?.[cycleName]?.[countryIso as CountryIso] ?? { prefilled: [], contacts: [] }
  )
}
