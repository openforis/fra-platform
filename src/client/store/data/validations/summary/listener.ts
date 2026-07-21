import { isAnyOf } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { DescriptionValidationActions } from 'client/store/data/validations/descriptions/actions'
import { NationalDataPointValidationActions } from 'client/store/data/validations/nationalDataPoints/actions'
import { set } from 'client/store/data/validations/summary/actions/set'
import { recomputeSummary, RecomputeSummaryProps } from 'client/store/data/validations/summary/recomputeSummary'
import { TableValidationActions } from 'client/store/data/validations/tables/actions'
import { startAppListening } from 'client/store/middleware/listener'

const isValidationUpdate = isAnyOf(
  TableValidationActions.setNodeValueValidations,
  DescriptionValidationActions.setValidations,
  NationalDataPointValidationActions.setValidations,
  NationalDataPointValidationActions.updateValidations,
  NationalDataPointValidationActions.deleteValidation
)

export const startValidationSummaryListener = (): void => {
  startAppListening({
    matcher: isValidationUpdate,
    effect: (action, { dispatch, getState }) => {
      const { assessmentName, countryIso, cycleName } = action.payload

      const { validations } = getState().data
      const currentSummary = validations.summary?.[assessmentName]?.[cycleName]?.[countryIso]
      if (Objects.isEmpty(currentSummary)) return

      const props: RecomputeSummaryProps = { summary: currentSummary }

      if (TableValidationActions.setNodeValueValidations.match(action)) {
        props.tableValidations = action.payload.tableValidations
      }

      if (DescriptionValidationActions.setValidations.match(action)) {
        props.descriptionValidations = validations.descriptions?.[assessmentName]?.[cycleName]?.[countryIso] ?? {}
        props.descriptionSectionNames = action.payload.sectionNames
      }

      if (
        NationalDataPointValidationActions.setValidations.match(action) ||
        NationalDataPointValidationActions.updateValidations.match(action) ||
        NationalDataPointValidationActions.deleteValidation.match(action)
      ) {
        const nationalDataPointValidations = validations.nationalDataPoints?.[assessmentName]?.[cycleName]?.[countryIso]
        if (Objects.isNil(nationalDataPointValidations)) return

        props.nationalDataPointValidations = nationalDataPointValidations
      }

      const summary = recomputeSummary(props)

      dispatch(set({ assessmentName, countryIso, cycleName, summary }))
    },
  })
}
