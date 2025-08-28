import { ExtraEstimation, LayerSectionKey } from 'meta/geo'
import { BurnedAreaModis } from 'meta/geo/forest'
import { ProtectedAreaEstimations } from 'meta/geo/forestEstimations'

import { GeoStatisticsSelectors } from 'client/store/geo/statistics/selectors'
import { ExtraEstimationState, GeoStatisticsState } from 'client/store/geo/statistics/state'
import { useAppSelector } from 'client/store/hooks'

export const useGeoBurnedAreaMODIS = (): BurnedAreaModis => useAppSelector(GeoStatisticsSelectors.getBurnedAreaMODIS)

export const useGeoStatistics = (): GeoStatisticsState => useAppSelector(GeoStatisticsSelectors.getStatistics)

export const useGeoExtraEstimation = (
  sectionKey: LayerSectionKey,
  extraEstimation: ExtraEstimation
): ExtraEstimationState | undefined =>
  useAppSelector((state) => GeoStatisticsSelectors.getExtraEstimation(state, sectionKey, extraEstimation))

export const useGeoFra1aLandArea = (): number | undefined => useAppSelector(GeoStatisticsSelectors.getFra1aLandArea)

export const useGeoProtectedAreas = (): Partial<ProtectedAreaEstimations> =>
  useAppSelector(GeoStatisticsSelectors.getProtectedAreas)
