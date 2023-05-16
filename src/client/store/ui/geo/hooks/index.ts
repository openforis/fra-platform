import { CountryIso } from '@meta/area'
import { GeoStatisticsState, LayerKey, LayerSectionKey, MapPanel, MosaicOptions } from '@meta/geo'

import { useAppSelector } from '@client/store'

import { LayersSectionState, LayerState } from '../stateType'

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

export const useGeoLayerSection = (sectionKey: LayerSectionKey): LayersSectionState | undefined =>
  useAppSelector((state) => state.geo.sections[sectionKey])

export const useGeoLayer = (sectionKey: LayerSectionKey, layerKey: LayerKey): LayerState | undefined =>
  useAppSelector((state) => state.geo.sections[sectionKey]?.[layerKey])

export { useGteTreeCoverPercent } from './useGteTreeCoverPercent'
