import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Objects } from '@utils/objects'

import { ApiEndPoint } from '@meta/api/endpoint'
import { ODPYears, OriginalDataPoint } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { OriginalDataPointActions, useOriginalDataPoint } from '@client/store/pages/originalDataPoint'
import { useCountryIso, useGetRequest } from '@client/hooks'
import { ClientRoutes } from '@client/clientRoutes'

// TODO: Handle error
const years = ['', ...ODPYears]

type Props = {
  canEditData: boolean
}

const YearSelection: React.FC<Props> = (props) => {
  const { canEditData } = props
  const originalDataPoint = useOriginalDataPoint()
  const { sectionName } = useParams<{
    sectionName: string
  }>()
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const classNameYearSelection = '' // TODO: originalDataPoint.validationStatus && !originalDataPoint.validationStatus.year.valid ? 'error' : ''

  const { data, dispatch: fetchReservedYears } = useGetRequest(
    ApiEndPoint.CycleData.OriginalDataPoint.reservedYears(),
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
      <h3 className="subhead">{i18n.t<string>('nationalDataPoint.referenceYearData')}</h3>
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
                countryIso,
                cycleName: cycle.name,
                assessmentName: assessment.props.name,
                originalDataPoint: originalDataPointUpdate,
              })
            )
            // Update url but do not push new entry to state
            const url = ClientRoutes.Assessment.OriginalDataPoint.Section.getLink({
              countryIso,
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              year: value,
              sectionName,
            })
            window.history.replaceState(null, null, url)
          }}
        >
          {years.map((year) => (
            <option key={year} value={year} disabled={reservedYears.includes(Number(year))} hidden={!year}>
              {year || i18n.t<string>('nationalDataPoint.selectYear')}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default YearSelection
