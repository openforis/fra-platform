import { createAction } from '@reduxjs/toolkit'

export const setNavigationVisible = createAction<boolean | undefined>('ui/countryReport/navigation/update')
