import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { setNodeValueValidations } from 'client/store/data/validations/tables/actions/setNodeValueValidations'
import { TableValidationState } from 'client/store/data/validations/tables/state'

export const setNodeValueValidationsReducer = (builder: ActionReducerMapBuilder<TableValidationState>): void => {
  builder.addCase(setNodeValueValidations, (state, action) => {
    const { assessmentName, countryIso, cycleName, tableValidations } = action.payload

    const path = [assessmentName, cycleName, countryIso]
    const oldValue = Objects.getInPath(state, path)

    const value = { ...oldValue, ...tableValidations }
    Objects.setInPath({ obj: state, path, value })
  })
}
