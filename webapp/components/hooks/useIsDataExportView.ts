import { Areas } from '@core/country'

import useCountryIso from '../../store/app/hooks/useCountryIso'

export default () => {
  const countryIso = useCountryIso()
  return countryIso && !Areas.isISOCountry(countryIso)
}
