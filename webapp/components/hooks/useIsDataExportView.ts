// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { Area } from '@common/country'

import useCountryIso from './useCountryIso'

export default () => {
  const countryIso = useCountryIso()
  return countryIso && !Area.isISOCountry(countryIso)
}
