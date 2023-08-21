import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { ODPs, OriginalDataPoint } from 'meta/assessment'
import { Routes } from 'meta/routes'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { OriginalDataPointActions, useODPYears, useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { useCountryIso } from 'client/hooks'

type Props = {
  canEditData: boolean
}

const YearSelection: React.FC<Props> = (props) => {
  const { canEditData } = props
  const originalDataPoint = useOriginalDataPoint()
  const { sectionName } = useParams<{ sectionName: string }>()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const { years, reservedYears } = useODPYears(cycle)
  const validYear = ODPs.validateYear(originalDataPoint)

  return (
    <div className="odp__section">
      <h3 className="subhead">{t('nationalDataPoint.referenceYearData')}</h3>
      <div
        className={classNames('odp__year-selection', {
          error: !validYear,
        })}
      >
        <select
          disabled={!canEditData}
          className="select validation-error-sensitive-field"
          value={originalDataPoint.year || ''}
          onChange={(event) => {
            const { value } = event.target
            const originalDataPointUpdate = {
              ...originalDataPoint,
              year: Objects.isEmpty(value) ? null : Number(value),
            } as OriginalDataPoint
            dispatch(
              OriginalDataPointActions.updateOriginalDataPoint({
                countryIso,
                cycleName: cycle.name,
                assessmentName: assessment.props.name,
                originalDataPoint: originalDataPointUpdate,
              })
            )
            // Update url but do not push new entry to state
            const url = Routes.OriginalDataPoint.generatePath({
              countryIso,
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              year: value,
              sectionName,
            })
            window.history.replaceState(null, null, url)
          }}
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
