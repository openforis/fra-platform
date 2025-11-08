import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { OriginalDataPointActions } from 'client/store/data/originalDataPoint/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type Props = {
  originalDataPoint: OriginalDataPoint
  setSelectedPreviousYear: React.Dispatch<React.SetStateAction<string>>
  selectedPreviousYear: string
}

type Returned = () => void

export const useOnCopyClick = (params: Props): Returned => {
  const { originalDataPoint, selectedPreviousYear, setSelectedPreviousYear } = params
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()

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
    countryIso,
    cycleName,
    dispatch,
    originalDataPoint,
    selectedPreviousYear,
    setSelectedPreviousYear,
    t,
  ])
}
