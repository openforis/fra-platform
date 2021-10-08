import { useAppSelector } from '@webapp/store'
import { RootState } from '@webapp/store/RootState'

export const useHomeCountriesFilter = (): Array<string> =>
  useAppSelector((state: RootState) => state?.page?.home?.countriesFilter ?? [])
