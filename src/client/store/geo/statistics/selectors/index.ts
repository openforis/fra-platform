import { createSelector } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { ExtraEstimation, LayerSectionKey } from 'meta/geo'
import { ProtectedAreaEstimations } from 'meta/geo/forestEstimations'
import { protectedAreaKeys } from 'meta/geo/protectedAreaSource'

import { GeoSliceName } from 'client/store/geo/slice/name'
import { GeoStatisticsSliceName } from 'client/store/geo/statistics/slice/name'
import { GeoStatisticsState, initialState } from 'client/store/geo/statistics/state'
import { RootState } from 'client/store/types'

const getStatistics = createSelector(
  (state: RootState) => state[GeoSliceName]?.[GeoStatisticsSliceName],
  (getStatisticsState) => getStatisticsState ?? initialState
)

const getBurnedAreaMODIS = createSelector(
  getStatistics,
  (geoStatisticsState: GeoStatisticsState) => geoStatisticsState?.forestEstimations?.data?.burnedAreaMODIS
)

const getExtraEstimation = createSelector(
  [
    getStatistics,
    (_state: RootState, sectionKey: LayerSectionKey): LayerSectionKey => sectionKey,
    (_state: RootState, _sectionKey: LayerSectionKey, extraEstimation: ExtraEstimation): ExtraEstimation =>
      extraEstimation,
  ],
  (statisticsState, sectionKey, extraEstimation) => {
    return statisticsState?.extraEstimations?.[sectionKey]?.[extraEstimation]
  }
)

const getFra1aLandArea = createSelector(
  getStatistics,
  (statisticsState) => statisticsState?.forestEstimations?.data?.fra1aLandArea
)

const emptyProtectedAreas: Partial<ProtectedAreaEstimations> = {}

const getProtectedAreas = createSelector(getStatistics, (statisticsState): Partial<ProtectedAreaEstimations> => {
  const data = statisticsState?.forestEstimations?.data
  if (Objects.isEmpty(data)) return emptyProtectedAreas

  return protectedAreaKeys.reduce<Partial<ProtectedAreaEstimations>>((acc, key) => {
    acc[key] = data[key]
    return acc
  }, {})
})

export const GeoStatisticsSelectors = {
  getBurnedAreaMODIS,
  getExtraEstimation,
  getFra1aLandArea,
  getProtectedAreas,
  getStatistics,
}
