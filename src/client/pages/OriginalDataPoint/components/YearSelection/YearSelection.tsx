import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { ODPs } from 'meta/assessment'

import { useODPYears, useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { useIsEditTableDataEnabled } from 'client/store/user'
import { useOriginalDataPointRouteParams } from 'client/hooks/useRouteParams'

import { useOnChange } from './hooks/useOnChange'

const YearSelection: React.FC = () => {
  const { t } = useTranslation()
  const { cycleName, sectionName } = useOriginalDataPointRouteParams()
  const originalDataPoint = useOriginalDataPoint()
  const canEditData = useIsEditTableDataEnabled(sectionName)
  const onChange = useOnChange()
  const { years, reservedYears } = useODPYears(cycleName)
  const validYear = ODPs.validateYear(originalDataPoint)
  const disabled = Boolean(!canEditData)

  return (
    <div className="odp__section">
      <h3 className="subhead">{t('nationalDataPoint.referenceYearData')}</h3>
      <div className={classNames('odp__year-selection', { error: !validYear })}>
        <select
          className="select validation-error-sensitive-field"
          disabled={disabled}
          onChange={onChange}
          value={originalDataPoint.year || ''}
        >
          {['', ...years].map((year) => (
            <option key={year} disabled={reservedYears.includes(Number(year))} hidden={!year} value={year}>
              {year || t('nationalDataPoint.selectYear')}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default YearSelection
