import React from 'react'

import { Objects } from '@core/utils'
import { useOriginalDataPoint } from '@client/store/data/originalDataPoint'
// import { useAppDispatch } from '@client/store'
// import { ODPYears } from '@meta/assessment/originalDataPoint'
import { useTranslation } from 'react-i18next'

// TODO: Handle error
// const years = ['', ...ODPYears]
const years = ['']

type Props = {
  canEditData: boolean
}

const YearSelection: React.FC<Props> = (props) => {
  const { canEditData } = props
  const originalDataPoint = useOriginalDataPoint()

  // const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  // const countryIso = useCountryIso()

  const classNameYearSelection = '' // TODO: originalDataPoint.validationStatus && !originalDataPoint.validationStatus.year.valid ? 'error' : ''
  //
  // const { data, dispatch: fetchReservedYears } = useGetRequest(ApiEndPoint.OriginalDataPoint.reservedYears(countryIso))
  // useEffect(() => {
  //   fetchReservedYears()
  // }, [])

  const reservedYears = [] // data?.years ?? []

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
            const odpUpdate = { ...originalDataPoint, year: Objects.isEmpty(value) ? null : value }
            // TODO
            // dispatch(OriginalDataPointActions.updateODP({ odp: odpUpdate }))
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
