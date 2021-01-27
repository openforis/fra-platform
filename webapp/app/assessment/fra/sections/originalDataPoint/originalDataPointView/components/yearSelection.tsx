import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'
import * as FRAUtils from '@common/fraUtils'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import { saveDraft } from '../../actions'

// @ts-ignore
// TODO : remove ramda
const years = ['', ...R.pipe(R.range(1950), R.reverse)(2021)]
type Props = {
  canEditData: boolean
  odp: any
}
const YearSelection = (props: Props) => {
  const { odp, canEditData } = props
  const dispatch = useDispatch()
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const classNameYearSelection = odp.validationStatus && !odp.validationStatus.year.valid ? 'error' : ''
  // @ts-ignore
  const reservedYears = useSelector(R.pipe(ExtentOfForestState.getFra, FRAUtils.getOdps, R.map(R.prop('name'))))
  return (
    <div className="odp__section">
      <h3 className="subhead">{(i18n as any).t('nationalDataPoint.referenceYearData')}</h3>
      <div className={`odp__year-selection ${classNameYearSelection}`}>
        <select
          disabled={!canEditData}
          className="select validation-error-sensitive-field"
          value={odp.year || ''}
          onChange={(event) =>
            dispatch(
              saveDraft(
                countryIso,
                R.assoc('year', R.isEmpty(event.target.value) ? null : Number(event.target.value), odp)
              )
            )
          }
        >
          {years.map((year) => (
            <option key={year} value={year} disabled={R.includes(year.toString(), reservedYears)} hidden={!year}>
              {year || (i18n as any).t('nationalDataPoint.selectYear')}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export default YearSelection
