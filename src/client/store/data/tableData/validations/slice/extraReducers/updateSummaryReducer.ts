import { ActionReducerMapBuilder, Draft, isAnyOf } from '@reduxjs/toolkit'

import { SectionName } from 'meta/assessment/section'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { DescriptionValidations } from 'meta/assessment/validation/descriptionValidations/descriptionValidations'
import { ValidationSummary } from 'meta/assessment/validation/summary'
import { Objects } from 'utils/objects'

import { setDescriptionValidations } from 'client/store/data/tableData/validations/actions/setDescriptionValidations'
import { setNodeValueValidations } from 'client/store/data/tableData/validations/actions/setNodeValueValidations'
import { RecordTableValidationsState, ValidationsState } from 'client/store/data/tableData/validations/state'

type ValidationSummaryDraft = Draft<ValidationSummary>

const _updateTables = (state: ValidationSummaryDraft, tableValidations: RecordTableValidationsState): void => {
  Object.keys(tableValidations).forEach((tableName) => {
    state.tables[tableName] = { valid: Objects.isEmpty(tableValidations[tableName]) }
  })
}

const _updateDescriptions = (
  state: ValidationSummaryDraft,
  descriptionValidations: RecordDescriptionValidations,
  sectionNames: Array<SectionName>
): void => {
  sectionNames.forEach((sectionName) => {
    state.descriptions[sectionName] = DescriptionValidations.calculateSummary({
      sectionValidations: descriptionValidations[sectionName],
    })
  })
}

const _recomputeSubsections = (state: ValidationSummaryDraft): void => {
  Object.entries(state.subsections).forEach(([subsectionUuid, summarySubsection]) => {
    const { sectionName, tableNames } = summarySubsection
    const descriptions = Object.values(state.descriptions[sectionName] ?? {})
    const descriptionsValid = descriptions.every((description) => description?.valid ?? true)
    const tablesValid = tableNames.every((tableName) => state.tables[tableName]?.valid ?? true)

    state.subsections[subsectionUuid].valid = descriptionsValid && tablesValid
  })
}

const _recomputeSections = (state: ValidationSummaryDraft): void => {
  Object.keys(state.sections).forEach((sectionUuid) => {
    const { subsections } = state.sections[sectionUuid]
    const subsectionUuids = Object.keys(subsections)

    state.sections[sectionUuid].valid = subsectionUuids.every((subsectionUuid) => {
      const subsectionValid = state.subsections[subsectionUuid]?.valid ?? true

      subsections[subsectionUuid].valid = subsectionValid

      return subsectionValid
    })
  })
}

export const updateSummaryReducer = (builder: ActionReducerMapBuilder<ValidationsState>): void => {
  builder.addMatcher(isAnyOf(setDescriptionValidations, setNodeValueValidations), (state, action) => {
    const { assessmentName, countryIso, cycleName } = action.payload
    const summary = state.summary?.[assessmentName]?.[cycleName]?.[countryIso]

    if (Objects.isEmpty(summary)) return

    if (setNodeValueValidations.match(action)) {
      const { tableValidations } = action.payload
      _updateTables(summary, tableValidations)
    }

    if (setDescriptionValidations.match(action)) {
      const { sectionNames } = action.payload
      const descriptionValidations = state.descriptions?.[assessmentName]?.[cycleName]?.[countryIso] ?? {}
      const summarySectionNames = Object.values(summary.subsections).map(({ sectionName }) => sectionName)
      const updatedSectionNames = sectionNames ?? summarySectionNames

      _updateDescriptions(summary, descriptionValidations, updatedSectionNames)
    }

    _recomputeSubsections(summary)
    _recomputeSections(summary)
  })
}
