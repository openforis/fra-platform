import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { OriginalDataPoint } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { OriginalDataPointActions } from 'client/store/ui/originalDataPoint'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useOnCopyClick = (params: {
  originalDataPoint: OriginalDataPoint
  setSelectedPreviousYear: React.Dispatch<React.SetStateAction<string>>
  selectedPreviousYear: string
}) => {
  const { originalDataPoint, setSelectedPreviousYear, selectedPreviousYear } = params
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  return useCallback(() => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t('nationalDataPoint.confirmCopyPreviousValues'))) {
      const props = {
        originalDataPoint,
        assessmentName,
        cycleName,
        countryIso: countryIso as CountryIso,
        year: originalDataPoint.year,
        targetYear: Number(selectedPreviousYear),
      }
      dispatch(OriginalDataPointActions.copyNationalClasses(props))
      setSelectedPreviousYear('')
    }
  }, [
    assessmentName,
    cycleName,
    countryIso,
    dispatch,
    originalDataPoint,
    selectedPreviousYear,
    setSelectedPreviousYear,
    t,
  ])
}
