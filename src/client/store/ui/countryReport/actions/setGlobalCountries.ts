import { createAction } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'

export const setGlobalCountries = createAction<Array<CountryIso>>('ui/countryReport/globalCountries/set')
