import { CountryIso } from 'meta/area'
import { GeoStatisticsState, LayerKey, LayerSectionKey, MapPanel, MosaicOptions } from 'meta/geo'

export enum LayerFetchStatus {
  Loading = 'Loading',
  Failed = 'Failed',
  Ready = 'Ready',
  Unfetched = 'Unfetched',
}

export type AgreementLevelState = {
  level: number
  reducerScale: number
}

// Similar to the type LayerOptions, but in this case it has the selected
// value instead of the list options.
export type LayerStateOptions = {
  assetId?: string
  gteTreeCoverPercent?: number
  agreementLayer?: AgreementLevelState
  year?: number
}

export type LayerState = {
  selected?: boolean
  opacity?: number
  status?: LayerFetchStatus
  options?: LayerStateOptions
  mapId?: string | null
  cache?: Record<string | number, string>
}

export type LayersSectionState = Record<LayerKey, LayerState>

export type GeoState = {
  sections: Record<LayerSectionKey, LayersSectionState>
  recipes: Record<LayerSectionKey, string>
  isMapAvailable: boolean
  selectedPanel: MapPanel
  mosaicOptions: {
    applied: MosaicOptions
    selected?: boolean
    status?: LayerFetchStatus
    ui: MosaicOptions
    url: Partial<Record<CountryIso, string>>
  }
  geoStatistics: GeoStatisticsState
}
