import { RootState, useAppSelector } from 'client/store'

export const useHomeCountriesFilter = (): Array<string> =>
  useAppSelector((state: RootState) => state?.ui?.home?.countriesFilter ?? [])
