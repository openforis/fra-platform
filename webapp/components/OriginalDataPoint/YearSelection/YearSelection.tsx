import React, { useEffect } from 'react'

import { ODP, ODPYears } from '@core/odp'
import { useCountryIso, useGetRequest, useI18n } from '@webapp/hooks'
import { OriginalDataPointActions } from '@webapp/store/page/originalDataPoint'
import { Objects } from '@core/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { useAppDispatch } from '@webapp/store'

const years = ['', ...ODPYears]

type Props = {
  canEditData: boolean
  odp: ODP
}

const YearSelection: React.FC<Props> = (props) => {
  const { odp, canEditData } = props

  const dispatch = useAppDispatch()
  const i18n = useI18n()
  const countryIso = useCountryIso()

  const classNameYearSelection = odp.validationStatus && !odp.validationStatus.year.valid ? 'error' : ''

  // TODO: fetch reserved years here, use useGetRequest
  const { data, dispatch: fetchReservedYears } = useGetRequest(ApiEndPoint.OriginalDataPoint.reservedYears(countryIso))
  useEffect(() => {
    fetchReservedYears()
  }, [])

  const reservedYears = data?.years ?? []

  return (
    <div className="odp__section">
      <h3 className="subhead">{i18n.t('nationalDataPoint.referenceYearData')}</h3>
      <div className={`odp__year-selection ${classNameYearSelection}`}>
        <select
          disabled={!canEditData}
          className="select validation-error-sensitive-field"
          value={odp.year || ''}
          onChange={(event) => {
            const { value } = event.target
            const odpUpdate = { ...odp, year: Objects.isEmpty(value) ? null : value }
            dispatch(OriginalDataPointActions.updateODP({ odp: odpUpdate }))
          }}
        >
          {years.map((year) => (
            <option key={year} value={year} disabled={reservedYears.includes(year)} hidden={!year}>
              {year || i18n.t('nationalDataPoint.selectYear')}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default YearSelection
