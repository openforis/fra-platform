import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { resetUrlTemplateData } from 'client/store/geo/mosaic/actions/resetUrlTemplateData'
import { GeoMosaicState } from 'client/store/geo/mosaic/state'

export const resetUrlTemplateDataReducer = (builder: ActionReducerMapBuilder<GeoMosaicState>): void => {
  builder.addCase(resetUrlTemplateData, (state) => {
    delete state.urlTemplateData
  })
}
