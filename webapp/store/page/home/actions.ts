import { HomeActionType, HomeCountriesFilterActions } from '@webapp/store/page/home/actionTypes'

const updateCountriesFilter = (countries: Array<string> = []): HomeCountriesFilterActions => ({
  type: HomeActionType.countriesFilterUpdate,
  countries,
})

export const HomeAction = {
  updateCountriesFilter,
}
