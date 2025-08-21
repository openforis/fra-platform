import { createSelector } from '@reduxjs/toolkit'

import { ExtraEstimation, GeoStatisticsState, LayerSectionKey } from 'meta/geo'
import { BurnedAreaModis } from 'meta/geo/forest'
import { ExtraEstimationState } from 'meta/geo/geoStatistics'

import { useAppSelector } from 'client/store/hooks'
import { RootState } from 'client/store/types'

export const useGeoStatistics = (): GeoStatisticsState => useAppSelector((state) => state.geo?.geoStatistics)

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
        faJrc2020Protected: state.geo?.geoStatistics?.forestEstimations?.data?.faJrc2020Protected,
      })
    )
  )
}

export const useGeoExtraEstimation = (
  sectionKey: LayerSectionKey,
  extraEstimation: ExtraEstimation
): ExtraEstimationState | undefined =>
  useAppSelector((state) => state.geo?.geoStatistics?.extraEstimations?.[sectionKey]?.[extraEstimation])

export const useGeoFra1aLandArea = (): number | undefined =>
  useAppSelector((state) => state.geo?.geoStatistics?.forestEstimations?.data?.fra1aLandArea)
