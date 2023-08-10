import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { OriginalDataPointActions } from 'client/store/ui/originalDataPoint'
import { useCountryIso } from 'client/hooks'

export const useOnCopyClick = (params: {
  originalDataPoint: OriginalDataPoint
  setSelectedPreviousYear: React.Dispatch<React.SetStateAction<string>>
  selectedPreviousYear: string
}) => {
  const { originalDataPoint, setSelectedPreviousYear, selectedPreviousYear } = params
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  const { t } = useTranslation()

  return useCallback(() => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t('nationalDataPoint.confirmCopyPreviousValues'))) {
      dispatch(
        OriginalDataPointActions.copyPreviousNationalClasses({
          originalDataPoint,
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          countryIso,
          year: Number(selectedPreviousYear),
        })
      )
      setSelectedPreviousYear('')
    }
  }, [
    assessment.props.name,
    countryIso,
    cycle.name,
    dispatch,
    originalDataPoint,
    selectedPreviousYear,
    setSelectedPreviousYear,
    t,
  ])
}
