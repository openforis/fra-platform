import { useParams } from 'react-router-dom'

export const useCountryIso = () => {
  // TODO: get this from store if not in url
  const { countryIso } = useParams<{ countryIso: string }>()
  return countryIso
}
