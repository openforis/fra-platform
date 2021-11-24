import { useAppSelector } from '../../../store'
import { RootState } from '../../../store/RootState'

export const useHomeCountriesFilter = (): Array<string> =>
  useAppSelector((state: RootState) => state?.page?.home?.countriesFilter ?? [])
