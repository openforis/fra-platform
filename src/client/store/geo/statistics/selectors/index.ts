import { createSelector } from '@reduxjs/toolkit'

import { ExtraEstimation, LayerSectionKey } from 'meta/geo'

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

export const GeoStatisticsSelectors = {
  getBurnedAreaMODIS,
  getExtraEstimation,
  getFra1aLandArea,
  getStatistics,
}
