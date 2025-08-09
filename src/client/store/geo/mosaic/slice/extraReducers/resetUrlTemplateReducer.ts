import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { resetUrlTemplate } from 'client/store/geo/mosaic/actions/resetUrlTemplate'
import { MosaicState } from 'client/store/geo/mosaic/state'

export const resetUrlTemplateReducer = (builder: ActionReducerMapBuilder<MosaicState>) => {
  builder.addCase(resetUrlTemplate, (state) => {
    delete state.urlTemplate
  })
}
