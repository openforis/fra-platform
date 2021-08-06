import { Areas } from '@core/country'

import useCountryIso from './useCountryIso'

export default () => {
  const countryIso = useCountryIso()
  return countryIso && !Areas.isISOCountry(countryIso)
}
