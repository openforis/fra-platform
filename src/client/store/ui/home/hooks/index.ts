import { useAppSelector } from 'client/store'

import { selectHomeCountriesFilter } from '../selectors'

export const useHomeCountriesFilter = () => useAppSelector(selectHomeCountriesFilter)
