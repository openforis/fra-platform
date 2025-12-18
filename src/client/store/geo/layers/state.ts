import { LayerKey } from 'meta/geo/layer/key'

export type AgreementLevelState = {
  level: number
  reducerScale: number
}

export enum LayerFetchStatus {
  Failed = 'Failed',
  Loading = 'Loading',
  Ready = 'Ready',
  Unfetched = 'Unfetched',
}

export type LayerStateOptions = {
  agreementLayer?: AgreementLevelState
  assetId?: string
  gteTreeCoverPercent?: number
  year?: number
}

export type LayerState = {
  cache?: Record<string | number, string>
  mapId?: string
  tileUrl?: string
  opacity?: number
  options?: LayerStateOptions
  selected?: boolean
  status?: LayerFetchStatus
}

export type GeoLayersState = { [key in LayerKey]?: LayerState }

export const initialState: GeoLayersState = {}
