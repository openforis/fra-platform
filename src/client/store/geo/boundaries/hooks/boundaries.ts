import { BoundariesSelectors } from 'client/store/geo/boundaries/selectors'
import { LayerFetchStatus } from 'client/store/geo/layers/state'
import { useAppSelector } from 'client/store/hooks'

export const useShowUnBoundaries = (): boolean => useAppSelector(BoundariesSelectors.getShowUnBoundaries)

export const useUnBoundariesStatus = (): LayerFetchStatus => useAppSelector(BoundariesSelectors.getStatus)

export const useUnBoundariesTileUrl = (): string | undefined => useAppSelector(BoundariesSelectors.getTileUrl)
