import { useEffect } from 'react'
import { isAnyOf } from '@reduxjs/toolkit'

import { ValidationSummaries } from 'meta/assessment/validation/validationSummaries'
import { ComputeProps } from 'meta/assessment/validation/validationSummaries/compute'
import { Objects } from 'utils/objects'

import { DescriptionValidationActions } from 'client/store/data/validations/descriptions/actions'
import { NationalDataPointValidationActions } from 'client/store/data/validations/nationalDataPoints/actions'
import { SummaryValidationActions } from 'client/store/data/validations/summary/actions'
import { TableValidationActions } from 'client/store/data/validations/tables/actions'
import { useAppDispatch } from 'client/store/hooks'
import { addAppListener } from 'client/store/middleware/listener'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'

const isValidationUpdate = isAnyOf(
  TableValidationActions.setNodeValueValidations,
  DescriptionValidationActions.setValidations,
  NationalDataPointValidationActions.setValidations,
  NationalDataPointValidationActions.updateValidations,
  NationalDataPointValidationActions.deleteValidation
)

export const useValidationSummaryListener = (): void => {
  const canEditData = useCanEditCycleData()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!canEditData) return undefined

    const unsubscribe = dispatch(
      addAppListener({
        matcher: isValidationUpdate,
        effect: (action, listenerApi): void => {
          const { assessmentName, countryIso, cycleName } = action.payload

          const { validations } = listenerApi.getState().data
          const currentSummary = validations.summary?.[assessmentName]?.[cycleName]?.[countryIso]
          if (Objects.isEmpty(currentSummary)) return

          const props: ComputeProps = { summary: currentSummary }

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
            const nationalDataPointValidations =
              validations.nationalDataPoints?.[assessmentName]?.[cycleName]?.[countryIso]
            if (Objects.isNil(nationalDataPointValidations)) return

            props.nationalDataPointValidations = nationalDataPointValidations
          }

          const summary = ValidationSummaries.compute(props)

          listenerApi.dispatch(SummaryValidationActions.set({ assessmentName, countryIso, cycleName, summary }))
        },
      })
    )

    return unsubscribe
  }, [canEditData, dispatch])
}
