import { Area } from '@common/country'

import useCountryIso from './useCountryIso'

export default () => {
  const countryIso = useCountryIso()
  return countryIso && !Area.isISOCountry(countryIso)
}
