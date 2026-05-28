import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { SectionDescriptionValidations } from 'meta/assessment/validation/description'
import { Objects } from 'utils/objects'

import { setDescriptionValidations } from 'client/store/data/tableData/validations/actions/setDescriptionValidations'
import { ValidationsState } from 'client/store/data/tableData/validations/state'

const _updateTextDescriptionSectionValidation = (
  current: SectionDescriptionValidations,
  update: SectionDescriptionValidations
): SectionDescriptionValidations => {
  const value: SectionDescriptionValidations = { ...current }

  if (!Objects.isEmpty(update.descriptions)) {
    value.descriptions = { ...current.descriptions, ...update.descriptions }
  } else {
    delete value.descriptions
  }

  return value
}

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
      const value = _updateTextDescriptionSectionValidation(current, update)

      if (Objects.isEmpty(value)) {
        delete currentValue[sectionName]
      } else {
        currentValue[sectionName] = value
      }
    })
  })
}
