import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useIsOriginalDataPointUpdating } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useIsPrintRoute } from 'client/hooks/routes'

import { useOnCopyClick } from './hooks/useOnCopyClick'
import { useReservedYearsWithClasses } from './hooks/useReservedYearsWithClasses'

export const Prefill = (props: { canEditData: boolean; originalDataPoint: OriginalDataPoint }) => {
  const { canEditData, originalDataPoint } = props
  const { year } = originalDataPoint
  const [selectedPreviousYear, setSelectedPreviousYear] = useState<string>('')
  const { print } = useIsPrintRoute()

  const { t } = useTranslation()

  const originalDataPointUpdating = useIsOriginalDataPointUpdating()
  const reservedYearsWithClasses = useReservedYearsWithClasses(year)
  const onCopyClick = useOnCopyClick({ originalDataPoint, setSelectedPreviousYear, selectedPreviousYear })

  if (!canEditData || print) {
    return null
  }

  // Copying is disabled if: odp doesn't have a year, there is no previous years or previous year is not selected
  const copyDisabled = !year || year === -1 || originalDataPointUpdating || reservedYearsWithClasses.length < 1
  return (
    <div className="odp__previous-year-selection">
      <h4>{t('nationalDataPoint.prefillWith')}</h4>
      <select
        className="select"
        disabled={copyDisabled}
        onChange={(e) => setSelectedPreviousYear(e.target.value)}
        value={selectedPreviousYear}
      >
        <option value="">{t('nationalDataPoint.selectYear')}</option>
        {reservedYearsWithClasses?.map((reservedYear: number) => (
          <option key={reservedYear} value={reservedYear}>
            {reservedYear}
          </option>
        ))}
      </select>
      <button
        className="btn-s btn-primary btn-copy-prev-values"
        disabled={copyDisabled || selectedPreviousYear === ''}
        onClick={onCopyClick}
        type="button"
      >
        {t('nationalDataPoint.prefill')}
      </button>
    </div>
  )
}
