import { useAppSelector } from 'client/store'

import { HomeSelector } from '../selectors'

export const useHomeCountriesFilter = () => useAppSelector(HomeSelector.getCountriesFilter)
