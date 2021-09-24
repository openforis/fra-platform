import { Areas } from '@core/country'

import { useCountryIso } from '@webapp/hooks/index'

export default () => {
  const countryIso = useCountryIso()
  return countryIso && !Areas.isISOCountry(countryIso)
}
