import { CountryIso } from 'meta/area'
import { BurnedAreasOptions, ForestOptions, GeoStatisticsState, MapPanel, MosaicOptions, ProtectedAreasOptions } from 'meta/geo'

import { useAppSelector } from 'client/store'

export const useMosaicUrl = (countryIso: CountryIso): string => useAppSelector((state) => state.geo?.mosaicOptions.mosaicUrl[countryIso])

export const useMosaicSelected = (): boolean => useAppSelector((state) => state.geo?.mosaicOptions.mosaicSelected)

export const useMosaicPending = (): boolean => useAppSelector((state) => state.geo?.mosaicOptions.mosaicPending)

export const useMosaicFailed = (): boolean => useAppSelector((state) => state.geo?.mosaicOptions.mosaicFailed)

export const useUiMosaicOptions = (): MosaicOptions => useAppSelector((state) => state.geo?.mosaicOptions.ui)

export const useAppliedMosaicOptions = (): MosaicOptions => useAppSelector((state) => state.geo?.mosaicOptions.applied)

export const useSelectedPanel = (): MapPanel => useAppSelector((state) => state.geo?.selectedPanel)

export const useForestSourceOptions = (): ForestOptions => useAppSelector((state) => state.geo?.forestOptions)

export const useIsGeoMapAvailable = (): boolean => useAppSelector((state) => state.geo?.isMapAvailable)

export const useGeoStatistics = (): GeoStatisticsState => useAppSelector((state) => state.geo?.geoStatistics)

export const useProtectedAreasOptions = (): ProtectedAreasOptions => useAppSelector((state) => state.geo?.protectedAreasOptions)

export const useBurnedAreasOptions = (): BurnedAreasOptions => useAppSelector((state) => state.geo?.burnedAreasOptions)
