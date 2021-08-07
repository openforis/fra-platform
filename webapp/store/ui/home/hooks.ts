import { useSelector } from 'react-redux'

export const useHomeCountriesFilter = (): Array<string> =>
  useSelector((state: any) => state?.ui?.home?.selectedCountries ?? [])
