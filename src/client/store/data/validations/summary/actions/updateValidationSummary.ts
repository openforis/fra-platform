import { createAsyncThunk } from '@reduxjs/toolkit'

import { CountryParams } from 'meta/api/request/country'
import { SectionName } from 'meta/assessment/section'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { DescriptionValidations } from 'meta/assessment/validation/descriptionValidations'
import { NationalDataPointValidations } from 'meta/assessment/validation/nationalDataPointValidations'
import { ValidationSummary } from 'meta/assessment/validation/summary'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'
import { Objects } from 'utils/objects'

import { setValidationSummary } from 'client/store/data/validations/summary/actions/setValidationSummary'
import { ThunkApiConfig } from 'client/store/types'

const _updateTables = (state: ValidationSummary, tableValidations: RecordTableValidationsState): void => {
  Object.keys(tableValidations).forEach((tableName) => {
    state.tables[tableName] = { valid: Objects.isEmpty(tableValidations[tableName]) }
  })
}

const _updateDescriptions = (
  state: ValidationSummary,
  descriptionValidations: RecordDescriptionValidations,
  sectionNames: Array<SectionName>
): void => {
  sectionNames.forEach((sectionName) => {
    state.descriptions[sectionName] = DescriptionValidations.calculateSummary({
      sectionValidations: descriptionValidations[sectionName],
    })
  })
}

const _recomputeSubsections = (state: ValidationSummary): void => {
  Object.entries(state.subsections).forEach(([subsectionUuid, summarySubsection]) => {
    const { descriptionNames, sectionName, tableNames } = summarySubsection
    const descriptionsValid = descriptionNames?.every(
      (descriptionName) => state.descriptions[sectionName]?.[descriptionName]?.valid ?? true
    )
    const tablesValid = tableNames.every((tableName) => state.tables[tableName]?.valid ?? true)
    const nationalDataPointsValid = state.nationalDataPoints[sectionName]?.valid ?? true

    state.subsections[subsectionUuid].valid = descriptionsValid && tablesValid && nationalDataPointsValid
  })
}

const _recomputeSections = (state: ValidationSummary): void => {
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

type Props = CountryParams & {
  descriptionSectionNames?: Array<SectionName>
  tableValidations?: RecordTableValidationsState
  updateDescriptions?: boolean
  updateNationalDataPoints?: boolean
}

export const updateValidationSummary = createAsyncThunk<void, Props, ThunkApiConfig>(
  'validations/summary/update',
  (props, { dispatch, getState }) => {
    const {
      assessmentName,
      countryIso,
      cycleName,
      descriptionSectionNames,
      tableValidations,
      updateDescriptions,
      updateNationalDataPoints,
    } = props

    const { validations } = getState().data
    const currentSummary = validations.summary?.[assessmentName]?.[cycleName]?.[countryIso]
    if (Objects.isEmpty(currentSummary)) return

    const summary = Objects.cloneDeep(currentSummary)

    if (!Objects.isNil(tableValidations)) {
      _updateTables(summary, tableValidations)
    }

    if (updateDescriptions) {
      const descriptionValidations = validations.descriptions?.[assessmentName]?.[cycleName]?.[countryIso] ?? {}
      const summarySectionNames = Object.values(summary.subsections).map(({ sectionName }) => sectionName)
      const sectionNames = descriptionSectionNames ?? summarySectionNames

      _updateDescriptions(summary, descriptionValidations, sectionNames)
    }

    if (updateNationalDataPoints) {
      const nationalDataPointValidations = validations.nationalDataPoints?.[assessmentName]?.[cycleName]?.[countryIso]
      if (Objects.isNil(nationalDataPointValidations)) return

      const sectionNames = Object.keys(summary.nationalDataPoints) as Array<SectionName>
      summary.nationalDataPoints = NationalDataPointValidations.calculateSummary({
        nationalDataPointValidations,
        sectionNames,
      })
    }

    _recomputeSubsections(summary)
    _recomputeSections(summary)

    dispatch(setValidationSummary({ assessmentName, countryIso, cycleName, summary }))
  }
)
