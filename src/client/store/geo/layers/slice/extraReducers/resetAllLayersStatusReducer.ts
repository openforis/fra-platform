import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { resetAllLayersStatus } from 'client/store/geo/layers/actions/resetAllLayersStatus'
import { LayerFetchStatus, LayersState } from 'client/store/geo/layers/state'

export const resetAllLayersStatusReducer = (builder: ActionReducerMapBuilder<LayersState>) => {
  builder.addCase(resetAllLayersStatus, (state) => {
    Object.keys(state).forEach((layerKey) => {
      Objects.setInPath({ obj: state, path: [layerKey, 'status'], value: LayerFetchStatus.Unfetched })
      Objects.setInPath({ obj: state, path: [layerKey, 'cache'], value: undefined })
      Objects.setInPath({ obj: state, path: [layerKey, 'mapId'], value: null })
    })
  })
}
