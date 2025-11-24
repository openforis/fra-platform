import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useIsOriginalDataPointUpdating } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useIsPrintRoute } from 'client/hooks/routes'
import Button from 'client/components/Buttons/Button'
import Select, { Option, SelectSize } from 'client/components/Inputs/Select'

import { useOnCopyClick } from './hooks/useOnCopyClick'
import { useReservedYearsWithClasses } from './hooks/useReservedYearsWithClasses'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

export const Prefill: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint } = props
  const { year } = originalDataPoint
  const [selectedPreviousYear, setSelectedPreviousYear] = useState<string>('')
  const { print } = useIsPrintRoute()

  const { t } = useTranslation()

  const originalDataPointUpdating = useIsOriginalDataPointUpdating()
  const reservedYearsWithClasses = useReservedYearsWithClasses(year)
  const onCopyClick = useOnCopyClick({ originalDataPoint, setSelectedPreviousYear, selectedPreviousYear })

  const options = reservedYearsWithClasses?.map<Option>((y) => {
    return { label: String(y), value: String(y) }
  })

  if (!canEditData || print) {
    return null
  }

  // Copying is disabled if: odp doesn't have a year, there is no previous years or previous year is not selected
  const copyDisabled = !year || year === -1 || originalDataPointUpdating || reservedYearsWithClasses.length < 1
  return (
    <div className="odp__previous-year-selection">
      <h4>{t('nationalDataPoint.prefillWith')}</h4>
      <Select
        bordered
        disabled={copyDisabled}
        onChange={(value: string) => setSelectedPreviousYear(value)}
        options={options}
        placeholder={t('nationalDataPoint.selectYear')}
        size={SelectSize.s}
        value={selectedPreviousYear}
      />
      <Button
        className="btn-s btn-primary btn-copy-prev-values"
        disabled={copyDisabled || selectedPreviousYear === ''}
        label={t('nationalDataPoint.prefill')}
        onClick={onCopyClick}
      />
    </div>
  )
}
