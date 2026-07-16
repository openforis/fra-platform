import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { setNodeValueValidations } from 'client/store/data/validations/actions/setNodeValueValidations'
import { ValidationsState } from 'client/store/data/validations/state'

export const setValidationsReducer = (builder: ActionReducerMapBuilder<ValidationsState>): void => {
  builder.addCase(setNodeValueValidations, (state, action) => {
    const { assessmentName, countryIso, cycleName, tableValidations } = action.payload

    const path = [assessmentName, cycleName, countryIso]
    const oldValue = Objects.getInPath(state.tables, path)

    const value = { ...oldValue, ...tableValidations }
    Objects.setInPath({ obj: state.tables, path, value })
  })
}
