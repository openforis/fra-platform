import React, { useEffect } from 'react'

import { OriginalDataPointActions, useOriginalDataPoint } from '@client/store/pages/originalDataPoint'
import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { ODPYears, OriginalDataPoint } from '@meta/assessment/originalDataPoint'
import { useTranslation } from 'react-i18next'
import { useCountryIso, useGetRequest } from '@client/hooks'
import { ApiEndPoint } from '@common/api/endpoint'
import { Objects } from '@core/utils'

// TODO: Handle error
const years = ['', ...ODPYears]

type Props = {
  canEditData: boolean
}

const YearSelection: React.FC<Props> = (props) => {
  const { canEditData } = props
  const originalDataPoint = useOriginalDataPoint()

  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const classNameYearSelection = '' // TODO: originalDataPoint.validationStatus && !originalDataPoint.validationStatus.year.valid ? 'error' : ''

  const { data, dispatch: fetchReservedYears } = useGetRequest(
    ApiEndPoint.Assessment.OriginalDataPoint.ReservedYears.many(),
    {
      params: {
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
      },
    }
  )
  useEffect(() => {
    fetchReservedYears()
  }, [originalDataPoint.year])

  const reservedYears: Array<number> = data?.years ?? []

  return (
    <div className="odp__section">
      <h3 className="subhead">{i18n.t('nationalDataPoint.referenceYearData')}</h3>
      <div className={`odp__year-selection ${classNameYearSelection}`}>
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
                cycleName: cycle.name,
                assessmentName: assessment.props.name,
                originalDataPoint: originalDataPointUpdate,
                odpId: String(originalDataPointUpdate.id),
              })
            )
          }}
        >
          {years.map((year) => (
            <option key={year} value={year} disabled={reservedYears.includes(Number(year))} hidden={!year}>
              {year || i18n.t('nationalDataPoint.selectYear')}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default YearSelection
