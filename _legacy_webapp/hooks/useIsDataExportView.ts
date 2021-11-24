import { Areas } from '@core/country'

import { useCountryIso } from '../store/app'

export default () => {
  const countryIso = useCountryIso()
  return countryIso && !Areas.isISOCountry(countryIso)
}
