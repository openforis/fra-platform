import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import * as R from 'ramda'

import { useCountryIso, useI18n } from '@webapp/components/hooks'

import { saveDraft } from '../../actions'

const years = ['', ...R.pipe(R.range(1950), R.reverse)(2021)]

const YearSelection = (props) => {
  const { odp, canEditData } = props

  const dispatch = useDispatch()
  const i18n = useI18n()
  const countryIso = useCountryIso()

  const classNameYearSelection = odp.validationStatus && !odp.validationStatus.year.valid ? 'error' : ''

  return (
    <div className="odp__section">
      <h3 className="subhead">{i18n.t('nationalDataPoint.referenceYearData')}</h3>
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
            <option
              key={year}
              value={year}
              disabled={R.includes(year.toString(), R.propOr([], 'reservedYears', odp))}
              hidden={!year}
            >
              {year || i18n.t('nationalDataPoint.selectYear')}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

YearSelection.propTypes = {
  canEditData: PropTypes.bool.isRequired,
  odp: PropTypes.object.isRequired,
}

export default YearSelection
