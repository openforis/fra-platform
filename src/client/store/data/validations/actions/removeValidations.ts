import { createAction } from '@reduxjs/toolkit'

import { CountryParams } from 'meta/api/request/country'

export const removeValidations = createAction<CountryParams>('validations/remove')
