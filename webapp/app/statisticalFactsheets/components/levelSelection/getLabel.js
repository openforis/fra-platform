import { useSelector } from 'react-redux'
import * as CountryState from '@webapp/app/country/countryState'
import { levels } from '../../common/levels'

export const getLabel = (levelIso, i18n) => {
  const country = useSelector(CountryState.getCountryByCountryIso(levelIso))
  if (levelIso === levels.global || levels.region.includes(levelIso)) {
    return i18n.t(`statisticalFactsheets.category.${levelIso}`)
  }
  if (!country) return null
  return country.listName[i18n.language]
}
