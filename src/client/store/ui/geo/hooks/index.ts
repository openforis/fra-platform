import { CountryIso } from 'meta/area'
import { GeoStatisticsState, MapPanel, MosaicOptions } from 'meta/geo'

import { RootState, useAppSelector } from 'client/store'

export const useMosaicUrl = (countryIso: CountryIso): string =>
  useAppSelector((state) => state.geo?.mosaicOptions.mosaicUrl[countryIso])

export const useMosaicSelected = (): boolean => useAppSelector((state) => state.geo?.mosaicOptions.mosaicSelected)

export const useMosaicPending = (): boolean => useAppSelector((state) => state.geo?.mosaicOptions.mosaicPending)

export const useMosaicFailed = (): boolean => useAppSelector((state) => state.geo?.mosaicOptions.mosaicFailed)

export const useUiMosaicOptions = (): MosaicOptions => useAppSelector((state) => state.geo?.mosaicOptions.ui)

export const useAppliedMosaicOptions = (): MosaicOptions => useAppSelector((state) => state.geo?.mosaicOptions.applied)

export const useSelectedPanel = (): MapPanel => useAppSelector((state) => state.geo?.selectedPanel)

export const useIsGeoMapAvailable = (): boolean => useAppSelector((state) => state.geo?.isMapAvailable)

export const useGeoStatistics = (): GeoStatisticsState => useAppSelector((state) => state.geo?.geoStatistics)
