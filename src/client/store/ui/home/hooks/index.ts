import { useAppSelector } from 'client/store/hooks'

import { HomeSelector } from '../selectors'

export const useHomeCountriesFilter = () => useAppSelector(HomeSelector.getCountriesFilter)
