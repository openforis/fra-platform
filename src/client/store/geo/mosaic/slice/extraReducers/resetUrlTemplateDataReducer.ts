import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { resetUrlTemplateData } from 'client/store/geo/mosaic/actions/resetUrlTemplateData'
import { MosaicState } from 'client/store/geo/mosaic/state'

export const resetUrlTemplateDataReducer = (builder: ActionReducerMapBuilder<MosaicState>) => {
  builder.addCase(resetUrlTemplateData, (state) => {
    delete state.urlTemplateData
  })
}
