import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { setDescriptionValidations } from 'client/store/data/validations/actions/setDescriptionValidations'
import { ValidationsState } from 'client/store/data/validations/state'

export const setDescriptionValidationsReducer = (builder: ActionReducerMapBuilder<ValidationsState>): void => {
  builder.addCase(setDescriptionValidations, (state, action) => {
    const { assessmentName, countryIso, cycleName, descriptionValidations, sectionNames } = action.payload

    const path = [assessmentName, cycleName, countryIso]

    // When sectionNames is missing, this came from the full assessment/country verification flow.
    // In that case the server already sent the full cached snapshot for this country, so we can
    // replace the current description validations state directly.
    if (Objects.isEmpty(sectionNames)) {
      Objects.setInPath({ obj: state.descriptions, path, value: descriptionValidations })
      return
    }

    // With sectionNames, the server sends the whole state for those sections, so we swap them in.
    // Anything that's gone (like a fixed error) clears too.
    const currentValue = Objects.getInPath(state.descriptions, path) ?? {}
    Objects.setInPath({ obj: state.descriptions, path, value: currentValue })

    sectionNames.forEach((sectionName) => {
      const update = descriptionValidations[sectionName] ?? {}

      if (Objects.isEmpty(update)) {
        delete currentValue[sectionName]
        return
      }

      currentValue[sectionName] = update
    })
  })
}
