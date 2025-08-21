import { createSelector } from '@reduxjs/toolkit'

import { ExtraEstimation, ForestEstimationsData, LayerSectionKey } from 'meta/geo'
import { BurnedAreaModis } from 'meta/geo/forest'

import { GeoStatisticsSelectors } from 'client/store/geo/statistics/selectors'
import { ExtraEstimationState, GeoStatisticsState } from 'client/store/geo/statistics/state'
import { useAppSelector } from 'client/store/hooks'
import { RootState } from 'client/store/types'

export const useGeoBurnedAreaMODIS = (): BurnedAreaModis => useAppSelector(GeoStatisticsSelectors.getBurnedAreaMODIS)

export const useGeoStatistics = (): GeoStatisticsState => useAppSelector(GeoStatisticsSelectors.getStatistics)

export const useGeoExtraEstimation = (
  sectionKey: LayerSectionKey,
  extraEstimation: ExtraEstimation
): ExtraEstimationState | undefined =>
  useAppSelector((state) => GeoStatisticsSelectors.getExtraEstimation(state, sectionKey, extraEstimation))

export const useGeoFra1aLandArea = (): number | undefined => useAppSelector(GeoStatisticsSelectors.getFra1aLandArea)

export const useGeoProtectedAreas = (): Partial<ForestEstimationsData> => {
  return useAppSelector(
    createSelector(
      (state: RootState) => state,
      (state: RootState) => ({
        faCopernicusProtected: state.geoNew?.statistics?.forestEstimations?.data?.faCopernicusProtected,
        faEsa2009Protected: state.geoNew?.statistics?.forestEstimations?.data?.faEsa2009Protected,
        faEsa2020Protected: state.geoNew?.statistics?.forestEstimations?.data?.faEsa2020Protected,
        faEsriProtected: state.geoNew?.statistics?.forestEstimations?.data?.faEsriProtected,
        faGlobelandProtected: state.geoNew?.statistics?.forestEstimations?.data?.faGlobelandProtected,
        faHansen10Protected: state.geoNew?.statistics?.forestEstimations?.data?.faHansen10Protected,
        faHansen20Protected: state.geoNew?.statistics?.forestEstimations?.data?.faHansen20Protected,
        faHansen30Protected: state.geoNew?.statistics?.forestEstimations?.data?.faHansen30Protected,
        faJaxaProtected: state.geoNew?.statistics?.forestEstimations?.data?.faJaxaProtected,
        faTandemxProtected: state.geoNew?.statistics?.forestEstimations?.data?.faTandemxProtected,
        fra3bProtected: state.geoNew?.statistics?.forestEstimations?.data?.fra3bProtected,
        faJrc2020Protected: state.geoNew?.statistics?.forestEstimations?.data?.faJrc2020Protected,
      })
    )
  )
}
