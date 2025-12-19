import { LayerFetchStatus } from 'client/store/geo/layers/state'

export type GeoBoundariesState = {
  showUnBoundaries: boolean
  status?: LayerFetchStatus
  tileUrl?: string
}

export const initialState: GeoBoundariesState = {
  showUnBoundaries: false,
  status: LayerFetchStatus.Unfetched,
}
