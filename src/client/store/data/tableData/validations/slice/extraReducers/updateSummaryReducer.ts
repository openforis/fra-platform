import { ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { setDescriptionValidations } from 'client/store/data/tableData/validations/actions/setDescriptionValidations'
import { setNodeValueValidations } from 'client/store/data/tableData/validations/actions/setNodeValueValidations'
import { ValidationsState } from 'client/store/data/tableData/validations/state'

export const updateSummaryReducer = (builder: ActionReducerMapBuilder<ValidationsState>): void => {
  builder.addMatcher(isAnyOf(setDescriptionValidations, setNodeValueValidations), (state, action) => {
    const { assessmentName, countryIso, cycleName } = action.payload
    const summary = state.summary?.[assessmentName]?.[cycleName]?.[countryIso]

    if (Objects.isEmpty(summary)) return

    if (setNodeValueValidations.match(action)) {
      const { tableValidations } = action.payload
      const updatedTableNamesSet = new Set(Object.keys(tableValidations))

      // 1. Update changed tables
      updatedTableNamesSet.forEach((tableName) => {
        summary.tables[tableName] = { valid: Objects.isEmpty(tableValidations[tableName]) }
      })
    }

    if (setDescriptionValidations.match(action)) {
      const { sectionNames } = action.payload
      const descriptionValidations = state.descriptions?.[assessmentName]?.[cycleName]?.[countryIso] ?? {}
      const summarySectionNames = Object.values(summary.subsections).map(({ sectionName }) => sectionName)
      const updatedSectionNamesSet = new Set(sectionNames ?? summarySectionNames)

      // 2. Update changed descriptions
      updatedSectionNamesSet.forEach((sectionName) => {
        const descriptions = Object.values(descriptionValidations[sectionName]?.descriptions ?? {})
        summary.descriptions[sectionName] = {
          valid: descriptions.every((validation) => validation?.valid ?? true),
        }
      })
    }

    // 3. Recompute subsections
    Object.entries(summary.subsections).forEach(([subsectionUuid, summarySubsection]) => {
      const { sectionName, tableNames } = summarySubsection
      const descriptionsValid = summary.descriptions[sectionName]?.valid ?? true
      const tablesValid = tableNames.every((tableName) => summary.tables[tableName]?.valid ?? true)
      const valid = descriptionsValid && tablesValid

      summary.subsections[subsectionUuid].valid = valid
    })

    // 4. Recompute sections
    Object.keys(summary.sections).forEach((sectionUuid) => {
      const { subsections } = summary.sections[sectionUuid]
      const subsectionUuids = Object.keys(subsections)

      summary.sections[sectionUuid].valid = subsectionUuids.every((subsectionUuid) => {
        const subsectionValid = summary.subsections[subsectionUuid]?.valid ?? true

        subsections[subsectionUuid].valid = subsectionValid

        return subsectionValid
      })
    })
  })
}
