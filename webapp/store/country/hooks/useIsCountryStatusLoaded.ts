import { useSelector } from 'react-redux'
import * as CountryState from '@webapp/app/country/countryState'

export const useIsCountryStatusLoaded = () => useSelector(CountryState.hasStatus)
