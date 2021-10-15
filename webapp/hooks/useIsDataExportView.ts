import { Areas } from '@core/country'

import { useCountryIso } from '@webapp/store/app'

export default () => {
  const countryIso = useCountryIso()
  return countryIso && !Areas.isISOCountry(countryIso)
}
