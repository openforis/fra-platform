import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { ODPs } from 'meta/assessment/odps'

import { useODPYears, useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useIsEditTableDataEnabled } from 'client/store/user/hooks/auth'
import { useOriginalDataPointRouteParams } from 'client/hooks/routeParams'

import { useOnChange } from './hooks/useOnChange'

const YearSelection: React.FC = () => {
  const { t } = useTranslation()
  const { sectionName } = useOriginalDataPointRouteParams()
  const originalDataPoint = useOriginalDataPoint()
  const canEditData = useIsEditTableDataEnabled(sectionName)
  const onChange = useOnChange()
  const { reservedYears, years } = useODPYears()
  const validYear = ODPs.validateYear(originalDataPoint)
  const disabled = Boolean(!canEditData)

  return (
    <div className="odp__section">
      <h3 className="subhead">{t('nationalDataPoint.referenceYearData')}</h3>
      <div className="odp__year-selection">
        <select
          className={classNames('select', { 'validation-error': !validYear })}
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
