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
    value.descriptions = update.descriptions
  } else {
    delete value.descriptions
  }

  return value
}

export const setDescriptionValidationsReducer = (builder: ActionReducerMapBuilder<ValidationsState>): void => {
  builder.addCase(setDescriptionValidations, (state, action) => {
    const { assessmentName, countryIso, cycleName, descriptionValidations, sectionNames } = action.payload

    const path = [assessmentName, cycleName, countryIso]

    // Replace all description validations after a full refresh
    if (Objects.isEmpty(sectionNames)) {
      Objects.setInPath({ obj: state.descriptions, path, value: descriptionValidations })
      return
    }

    // Update only the affected sections after a single link check
    const currentValue = Objects.cloneDeep(Objects.getInPath(state.descriptions, path) ?? {})
    const targetSectionNames = Array.from(new Set([...sectionNames, ...Object.keys(descriptionValidations)]))

    targetSectionNames.forEach((sectionName) => {
      const current = currentValue[sectionName] ?? {}
      const update = descriptionValidations[sectionName] ?? {}
      const value = _updateTextDescriptionSectionValidation(current, update)

      if (Objects.isEmpty(value)) {
        delete currentValue[sectionName]
      } else {
        currentValue[sectionName] = value
      }
    })

    Objects.setInPath({ obj: state.descriptions, path, value: currentValue })
  })
}
