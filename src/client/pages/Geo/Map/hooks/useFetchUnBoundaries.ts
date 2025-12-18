import { useEffect } from 'react'

import { BoundariesActions } from 'client/store/geo/boundaries/actions'
import {
  useShowUnBoundaries,
  useUnBoundariesStatus,
  useUnBoundariesTileUrl,
} from 'client/store/geo/boundaries/hooks/boundaries'
import { LayerFetchStatus } from 'client/store/geo/layers/state'
import { useAppDispatch } from 'client/store/hooks'

export const useFetchUnBoundaries = (): void => {
  const dispatch = useAppDispatch()
  const showUnBoundaries = useShowUnBoundaries()
  const status = useUnBoundariesStatus()
  const tileUrl = useUnBoundariesTileUrl()

  useEffect(() => {
    if (!showUnBoundaries || tileUrl) return
    if (status !== LayerFetchStatus.Unfetched) return

    dispatch(BoundariesActions.getUnBoundariesLayer())
  }, [dispatch, showUnBoundaries, status, tileUrl])
}
