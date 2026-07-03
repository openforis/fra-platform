import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { deleteNationalDataPointValidation } from 'client/store/data/tableData/validations/actions/deleteNationalDataPointValidation'
import { ValidationsState } from 'client/store/data/tableData/validations/state'

export const deleteNationalDataPointValidationReducer = (builder: ActionReducerMapBuilder<ValidationsState>): void => {
  builder.addCase(deleteNationalDataPointValidation, (state, action) => {
    const { assessmentName, countryIso, cycleName, uuid } = action.payload
    const path = [assessmentName, cycleName, countryIso]
    const nationalDataPointValidations = Objects.getInPath(state.nationalDataPoints, path)

    if (Objects.isNil(nationalDataPointValidations)) return

    delete nationalDataPointValidations[uuid]
  })
}
