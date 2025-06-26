import { createAction } from '@reduxjs/toolkit'

import { Country } from 'meta/area'

export const updateCountries = createAction<Array<Country>>('dataExport/countries/update')
