import { LayerKey } from 'meta/geo'

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
  mapId?: string | null
  opacity?: number
  options?: LayerStateOptions
  selected?: boolean
  status?: LayerFetchStatus
}

export type LayersSectionState = Record<LayerKey, LayerState>

export type LayersState = Record<LayerKey, LayerState>

export const initialState = {} as LayersState
