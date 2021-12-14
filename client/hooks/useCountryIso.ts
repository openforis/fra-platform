import { useParams } from 'react-router-dom'
import { CountryIso } from '@meta/area'

export const useCountryIso = (): CountryIso => {
  // TODO: get this from store if not in url
  const { countryIso } = useParams<{ countryIso: CountryIso }>()
  return countryIso
}
