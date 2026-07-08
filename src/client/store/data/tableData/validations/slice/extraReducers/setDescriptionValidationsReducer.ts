import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { DescriptionValidations } from 'meta/assessment/validation/descriptionValidations'
import { Objects } from 'utils/objects'

import { setDescriptionValidations } from 'client/store/data/tableData/validations/actions/setDescriptionValidations'
import { ValidationsState } from 'client/store/data/tableData/validations/state'

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

    // When sectionNames is present, this came from the single-description verification flow.
    // That payload only includes the sections touched by that check, so we update just those
    // sections and leave the rest of the country state as is.
    const currentValue = Objects.getInPath(state.descriptions, path) ?? {}
    Objects.setInPath({ obj: state.descriptions, path, value: currentValue })

    sectionNames.forEach((sectionName) => {
      const current = currentValue[sectionName] ?? {}
      const update = descriptionValidations[sectionName] ?? {}

      if (Objects.isEmpty(update)) {
        delete currentValue[sectionName]
        return
      }

      const value = DescriptionValidations.mergeValidations({ current, update })

      if (Objects.isEmpty(value)) {
        delete currentValue[sectionName]
      } else {
        currentValue[sectionName] = value
      }
    })
  })
}
