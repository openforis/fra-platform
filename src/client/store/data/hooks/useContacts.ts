import { CountryIso } from 'meta/area'
import { Contact } from 'meta/cycleData'

import { useAppSelector } from 'client/store/store'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Returned = Array<Contact>

export const useContacts = (): Returned => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const contacts = useAppSelector<Returned>(
    (state) => state.data.contacts[assessmentName]?.[cycleName]?.[countryIso] ?? []
  )

  return [...contacts].sort((a, b) => a.props.rowIndex - b.props.rowIndex)
}
