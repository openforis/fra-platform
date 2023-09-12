import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'
import {
  BurnedAreasOptions,
  ForestOptions,
  GeoStatisticsState,
  MapPanel,
  MosaicOptions,
  ProtectedAreasOptions,
} from 'meta/geo'
import { BurnedAreaModis } from 'meta/geo/forest'

import { RootState, useAppSelector } from 'client/store'

export const useMosaicUrl = (countryIso: CountryIso): string =>
  useAppSelector((state) => state.geo?.mosaicOptions.mosaicUrl[countryIso])

export const useMosaicSelected = (): boolean => useAppSelector((state) => state.geo?.mosaicOptions.mosaicSelected)

export const useMosaicPending = (): boolean => useAppSelector((state) => state.geo?.mosaicOptions.mosaicPending)

export const useMosaicFailed = (): boolean => useAppSelector((state) => state.geo?.mosaicOptions.mosaicFailed)

export const useUiMosaicOptions = (): MosaicOptions => useAppSelector((state) => state.geo?.mosaicOptions.ui)

export const useAppliedMosaicOptions = (): MosaicOptions => useAppSelector((state) => state.geo?.mosaicOptions.applied)

export const useSelectedPanel = (): MapPanel => useAppSelector((state) => state.geo?.selectedPanel)

export const useForestSourceOptions = (): ForestOptions => useAppSelector((state) => state.geo?.forestOptions)

export const useIsGeoMapAvailable = (): boolean => useAppSelector((state) => state.geo?.isMapAvailable)

export const useGeoStatistics = (): GeoStatisticsState => useAppSelector((state) => state.geo?.geoStatistics)

export const useProtectedAreasOptions = (): ProtectedAreasOptions =>
  useAppSelector((state) => state.geo?.protectedAreasOptions)

export const useBurnedAreasOptions = (): BurnedAreasOptions => useAppSelector((state) => state.geo?.burnedAreasOptions)

export const useGeoBurnedAreaMODIS = (): BurnedAreaModis =>
  useAppSelector((state) => state.geo?.geoStatistics?.forestEstimations?.data?.burnedAreaMODIS)

export const useGeoProtectedAreas = () => {
  return useAppSelector(
    createSelector(
      (state: RootState) => state,
      (state: RootState) => ({
        faCopernicusProtected: state.geo?.geoStatistics?.forestEstimations?.data?.faCopernicusProtected,
        faEsa2009Protected: state.geo?.geoStatistics?.forestEstimations?.data?.faEsa2009Protected,
        faEsa2020Protected: state.geo?.geoStatistics?.forestEstimations?.data?.faEsa2020Protected,
        faEsriProtected: state.geo?.geoStatistics?.forestEstimations?.data?.faEsriProtected,
        faGlobelandProtected: state.geo?.geoStatistics?.forestEstimations?.data?.faGlobelandProtected,
        faHansen10Protected: state.geo?.geoStatistics?.forestEstimations?.data?.faHansen10Protected,
        faHansen20Protected: state.geo?.geoStatistics?.forestEstimations?.data?.faHansen20Protected,
        faHansen30Protected: state.geo?.geoStatistics?.forestEstimations?.data?.faHansen30Protected,
        faJaxaProtected: state.geo?.geoStatistics?.forestEstimations?.data?.faJaxaProtected,
        faTandemxProtected: state.geo?.geoStatistics?.forestEstimations?.data?.faTandemxProtected,
        fra3bProtected: state.geo?.geoStatistics?.forestEstimations?.data?.fra3bProtected,
      })
    )
  )
}
