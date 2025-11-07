import { createAction } from '@reduxjs/toolkit'

import { Country } from 'meta/area/country'

export const updateCountries = createAction<Array<Country>>('dataExport/countries/update')
