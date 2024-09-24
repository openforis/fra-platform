import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'

import { RootState } from 'client/store'

const _getState = (state: RootState) => state.ui.home

export const getCountriesFilter = createSelector(
  [_getState],
  (homeState): Array<CountryIso> => homeState?.countriesFilter ?? []
)

export const HomeSelector = {
  getCountriesFilter,
}
