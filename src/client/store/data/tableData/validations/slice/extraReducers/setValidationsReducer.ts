import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { setNodeValueValidations } from 'client/store/data/tableData/validations/actions/setNodeValueValidations'
import { ValidationsState } from 'client/store/data/tableData/validations/state'

export const setValidationsReducer = (builder: ActionReducerMapBuilder<ValidationsState>) =>
  builder.addCase(setNodeValueValidations, (state, action) => {
    const { assessmentName, countryIso, cycleName, tableValidations } = action.payload

    const path = [assessmentName, cycleName, countryIso]
    const oldValue = Objects.getInPath(state, path)

    const value = { ...oldValue, ...tableValidations }
    Objects.setInPath({ obj: state, path, value })
  })
