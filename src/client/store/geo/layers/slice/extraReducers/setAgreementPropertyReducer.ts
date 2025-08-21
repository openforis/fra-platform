import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { setAgreementProperty } from 'client/store/geo/layers/actions/setAgreementProperty'
import { LayersState } from 'client/store/geo/layers/state'

export const setAgreementPropertyReducer = (builder: ActionReducerMapBuilder<LayersState>) => {
  builder.addCase(setAgreementProperty, (state, action) => {
    const { key, layerKey, value } = action.payload

    Objects.setInPath({ obj: state, path: [layerKey, 'options', 'agreementLayer', key], value })
  })
}
