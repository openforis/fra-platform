import { Areas } from '@core/country'

import { useCountryIso } from '@webapp/hooks'

export default () => {
  const countryIso = useCountryIso()
  return countryIso && !Areas.isISOCountry(countryIso)
}
