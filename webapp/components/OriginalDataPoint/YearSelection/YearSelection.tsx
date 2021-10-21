import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import { ODP, ODPYears } from '@core/odp'
import * as FRAUtils from '@common/fraUtils'
import * as ExtentOfForestState from '@webapp/sectionSpec/fra/extentOfForest/extentOfForestState'
import { useI18n } from '@webapp/hooks'
import { OriginalDataPointActions } from '@webapp/store/page/originalDataPoint'
import { Objects } from '@core/utils'

const years = ['', ...ODPYears]

type Props = {
  canEditData: boolean
  odp: ODP
}

const YearSelection: React.FC<Props> = (props) => {
  const { odp, canEditData } = props

  const dispatch = useDispatch()
  const i18n = useI18n()

  const classNameYearSelection = odp.validationStatus && !odp.validationStatus.year.valid ? 'error' : ''

  // TODO: fetch reserved years here, use useGetRequest
  const reservedYears = useSelector(R.pipe(ExtentOfForestState.getFra, FRAUtils.getOdps, R.map(R.prop('name'))))

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
            <option key={year} value={year} disabled={R.includes(year.toString(), reservedYears)} hidden={!year}>
              {year || i18n.t('nationalDataPoint.selectYear')}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default YearSelection
