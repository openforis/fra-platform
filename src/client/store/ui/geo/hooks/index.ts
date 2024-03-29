import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'
import { ExtraEstimation, GeoStatisticsState, LayerKey, LayerSectionKey, MapPanel, MosaicOptions } from 'meta/geo'
import { BurnedAreaModis } from 'meta/geo/forest'
import { ExtraEstimationState } from 'meta/geo/geoStatistics'

import { RootState, useAppSelector } from 'client/store'

import { GeoMapOptions, LayerFetchStatus, LayersSectionState, LayerState } from '../stateType'

export const useMosaicUrl = (countryIso: CountryIso): string | undefined =>
  useAppSelector((state) => state.geo?.mosaicOptions.url[countryIso])

export const useMosaicSelected = (): boolean | undefined => useAppSelector((state) => state.geo?.mosaicOptions.selected)

export const useMosaicStatus = (): LayerFetchStatus | undefined =>
  useAppSelector((state) => state.geo?.mosaicOptions.status)

export const useUiMosaicOptions = (): MosaicOptions => useAppSelector((state) => state.geo?.mosaicOptions.ui)

export const useAppliedMosaicOptions = (): MosaicOptions => useAppSelector((state) => state.geo?.mosaicOptions.applied)

export const useSelectedPanel = (): MapPanel => useAppSelector((state) => state.geo?.selectedPanel)

export const useIsGeoMapAvailable = (): boolean => useAppSelector((state) => state.geo?.isMapAvailable)

export const useGeoStatistics = (): GeoStatisticsState => useAppSelector((state) => state.geo?.geoStatistics)

export const useGeoLayerSection = (sectionKey: LayerSectionKey): LayersSectionState | undefined =>
  useAppSelector((state) => state.geo.sections[sectionKey])

export const useGeoLayer = (sectionKey: LayerSectionKey, layerKey: LayerKey): LayerState | undefined =>
  useAppSelector((state) => state.geo.sections[sectionKey]?.[layerKey])

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

export const useGeoLayerSectionRecipeName = (sectionKey: LayerSectionKey): string | undefined =>
  useAppSelector((state) => state.geo.recipes[sectionKey])

export const useGeoLayerSections = (): Record<LayerSectionKey, LayersSectionState> | undefined =>
  useAppSelector((state) => state.geo?.sections)

export const useGeoExtaEstimation = (
  sectionKey: LayerSectionKey,
  extraEstimation: ExtraEstimation
): ExtraEstimationState | undefined =>
  useAppSelector((state) => state.geo?.geoStatistics?.extraEstimations?.[sectionKey]?.[extraEstimation])

export const useGeoFra1aLandArea = (): number | undefined =>
  useAppSelector((state) => state.geo?.geoStatistics?.forestEstimations?.data?.fra1aLandArea)

export const useGeoMapOptions = (): GeoMapOptions => useAppSelector((state) => state.geo.mapOptions)
