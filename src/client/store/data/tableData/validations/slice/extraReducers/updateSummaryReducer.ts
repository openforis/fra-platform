import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { setNodeValueValidations } from 'client/store/data/tableData/validations/actions/setNodeValueValidations'
import { ValidationsState } from 'client/store/data/tableData/validations/state'

export const updateSummaryReducer = (builder: ActionReducerMapBuilder<ValidationsState>): void => {
  builder.addMatcher(setNodeValueValidations.match, (state, action) => {
    const { assessmentName, countryIso, cycleName, tableValidations } = action.payload
    const summary = state.summary?.[assessmentName]?.[cycleName]?.[countryIso]

    if (Objects.isEmpty(summary)) return

    const updatedTableNamesSet = new Set(Object.keys(tableValidations))

    // 1. Update changed tables
    updatedTableNamesSet.forEach((tableName) => {
      summary.tables[tableName] = { valid: Objects.isEmpty(tableValidations[tableName]) }
    })

    // 2. Recompute subsections
    Object.entries(summary.subsections).forEach(([subsectionUuid, subsection]) => {
      const { tableNames } = subsection

      summary.subsections[subsectionUuid].valid = tableNames.every(
        (tableName) => summary.tables[tableName]?.valid ?? true
      )
    })

    // 3. Recompute sections
    Object.keys(summary.sections).forEach((sectionUuid) => {
      const { subsections } = summary.sections[sectionUuid]
      const subsectionUuids = Object.keys(subsections)

      summary.sections[sectionUuid].valid = subsectionUuids.every(
        (subsectionUuid) => summary.subsections[subsectionUuid]?.valid ?? true
      )
    })
  })
}
