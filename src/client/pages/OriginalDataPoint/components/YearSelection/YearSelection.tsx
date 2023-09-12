import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { ODPs } from 'meta/assessment'

import { useODPYears, useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

import { useOnChange } from './hooks/useOnChange'

type Props = {
  canEditData: boolean
}

const YearSelection: React.FC<Props> = (props) => {
  const { canEditData } = props

  const { t } = useTranslation()
  const { cycleName } = useSectionRouteParams()
  const originalDataPoint = useOriginalDataPoint()
  const onChange = useOnChange()
  const { years, reservedYears } = useODPYears(cycleName)

  const validYear = ODPs.validateYear(originalDataPoint)
  const disabled = Boolean(originalDataPoint.id || !canEditData)

  return (
    <div className="odp__section">
      <h3 className="subhead">{t('nationalDataPoint.referenceYearData')}</h3>
      <div className={classNames('odp__year-selection', { error: !validYear })}>
        <select
          disabled={disabled}
          className="select validation-error-sensitive-field"
          value={originalDataPoint.year || ''}
          onChange={onChange}
        >
          {['', ...years].map((year) => (
            <option key={year} value={year} disabled={reservedYears.includes(Number(year))} hidden={!year}>
              {year || t('nationalDataPoint.selectYear')}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default YearSelection
