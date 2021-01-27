import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRAUtils from '@common/fraUtils'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import { saveDraft } from '../../actions'

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
