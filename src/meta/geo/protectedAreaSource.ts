import { ExtraEstimation, extraEstimationsMetadata, ProtectedAreaEstimations } from 'meta/geo/forestEstimations'

import { ForestKey, forestLayersMetadata } from './forest'
import { LayerMetadata, LayerSection, LayerSectionKey } from './layer'

export enum ProtectedAreaKey {
  FilteredWDPA = 'FilteredWDPA',
  WDPA = 'WDPA',
  CustomPA = 'CustomPA',
}

export const protectedAreaLayersMetadata: Record<ProtectedAreaKey, LayerMetadata> = {
  [ProtectedAreaKey.FilteredWDPA]: {
    palette: ['#0f9ba6'],
    scale: 30,
    titleKey: 'geo.sections.protectedArea.layerTitles.filteredWdpa',
  },
  [ProtectedAreaKey.WDPA]: {
    palette: ['#2ed033'],
    scale: 0,
    titleKey: 'geo.sections.protectedArea.layerTitles.wdpa',
  },
  [ProtectedAreaKey.CustomPA]: {
    palette: ['#d5c266'],
    scale: 0,
    titleKey: 'geo.sections.protectedArea.layerTitles.customProtectedArea',
  },
}

export const protectedAreaLayers: LayerSection = {
  key: LayerSectionKey.ProtectedArea,
  titleKey: 'geo.sections.protectedArea.title',
  layers: [
    {
      key: ProtectedAreaKey.FilteredWDPA,
      metadata: protectedAreaLayersMetadata.FilteredWDPA,
    },
    // {
    //   key: ProtectedAreaKey.WDPA, // <- Layer not yet implemented in the backend
    //   metadata: protectedAreaLayersMetadata.WDPA,
    // },
    {
      key: ProtectedAreaKey.CustomPA,
      isCustomAsset: true,
      metadata: protectedAreaLayersMetadata.CustomPA,
    },
  ],
}

export const protectedAreaSources: Record<keyof ProtectedAreaEstimations, { titleKey: string }> = {
  faCopernicusProtected: { titleKey: forestLayersMetadata[ForestKey.Copernicus].titleKey },
  faEsa2009Protected: { titleKey: forestLayersMetadata[ForestKey.ESAGlobCover].titleKey },
  faEsa2020Protected: { titleKey: forestLayersMetadata[ForestKey.ESAWorldCover].titleKey },
  faEsriProtected: { titleKey: forestLayersMetadata[ForestKey.ESRI].titleKey },
  faGlobelandProtected: { titleKey: forestLayersMetadata[ForestKey.GlobeLand].titleKey },
  faHansen10Protected: { titleKey: 'geo.statistics.protectedArea.allGfc10' },
  faHansen20Protected: { titleKey: 'geo.statistics.protectedArea.allGfc20' },
  faHansen30Protected: { titleKey: 'geo.statistics.protectedArea.allGfc30' },
  faJaxaProtected: { titleKey: forestLayersMetadata[ForestKey.JAXA].titleKey },
  faTandemxProtected: { titleKey: forestLayersMetadata[ForestKey.TandemX].titleKey },
  fra3bProtected: { titleKey: extraEstimationsMetadata[ExtraEstimation.ReportedToFRA2020].titleKey },
  faJrc2020Protected: { titleKey: forestLayersMetadata[ForestKey.JRC2020].titleKey },
}

export const protectedAreaKeys = Object.keys(protectedAreaSources) as Array<keyof ProtectedAreaEstimations>
