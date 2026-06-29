import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { Objects } from 'utils/objects'

import { useODPYears, useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useIsEditTableDataEnabled } from 'client/store/user/hooks/auth'
import { useOriginalDataPointRouteParams } from 'client/hooks/routeParams'
import Select, { Option } from 'client/components/Inputs/Select'

import { useOnChange } from './hooks/useOnChange'
import { useYearErrorTooltip } from './hooks/useYearErrorTooltip'

const YearSelection: React.FC = () => {
  const { t } = useTranslation()
  const { sectionName } = useOriginalDataPointRouteParams()
  const originalDataPoint = useOriginalDataPoint()
  const canEditData = useIsEditTableDataEnabled(sectionName)
  const onChange = useOnChange()
  const { reservedYears, years } = useODPYears()
  const errorTooltip = useYearErrorTooltip({ nationalDataPoint: originalDataPoint })
  const disabled = Boolean(!canEditData)
  const options = years.map<Option>((y) => {
    return { label: String(y), value: String(y) }
  })

  return (
    <div className="odp__section">
      <h3 className="subhead">{t('nationalDataPoint.referenceYearData')}</h3>
      <div className="odp__year-selection">
        <Select
          bordered
          classNames={{ container: classNames({ 'validation-error': !Objects.isEmpty(errorTooltip) }) }}
          disabled={disabled}
          isClearable={false}
          isOptionDisabled={(option: Option) => reservedYears.includes(Number(option.value))}
          onChange={onChange}
          options={options}
          placeholder=""
          tooltip={errorTooltip}
          value={originalDataPoint?.year ? String(originalDataPoint.year) : ''}
        />
      </div>
    </div>
  )
}

export default YearSelection
