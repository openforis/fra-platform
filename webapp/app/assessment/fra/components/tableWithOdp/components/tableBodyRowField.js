import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import * as R from 'ramda'

import { isPrintingMode } from '@webapp/app/assessment/components/print/printAssessment'
import { formatNumber } from '@common/bignumberUtils'
import { acceptNextDecimal } from '@webapp/utils/numberInput'

import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'

const alwaysOkValidator = () => true

const TableBodyRowField = props => {
  const countryIso = useCountryIso()

  const {
    row, fra, save, saveMany, pasteUpdate, rowIdx, section, disabled
  } = props

  const { rowHeader, field, className, rowVariable, validator = alwaysOkValidator } = row

  const commentsOpen = useSelector(state => {
    const openThreadTarget = ReviewState.getOpenThreadTarget(state)
    return !R.isEmpty(openThreadTarget) && R.isEmpty(R.difference(openThreadTarget, [field]))
  })

  const dataValues = Object.values(fra)

  return (
    <tr
      key={field}
      className={`${commentsOpen ? 'fra-row-comments__open' : ''}`}>
      <th className={className ? className : 'fra-table__category-cell'}>
        {rowHeader} {rowVariable}
      </th>
      {
        dataValues.map((datum, colIdx) => {

          const className = 'fra-table__cell'
            + (datum.type === 'odp' && !isPrintingMode() ? ' odp-value-cell' : '')
            + (validator(datum, field) ? '' : ' validation-error')

          return (
            <td className={className} key={colIdx}>
              {
                datum.type === 'odp'
                  ? (
                    <div className="number-input__container validation-error-sensitive-field">
                      <div className="number-input__readonly-view">
                        {
                          formatNumber(datum[field])
                        }
                      </div>
                    </div>
                  )
                  : (
                    <ThousandSeparatedDecimalInput
                      numberValue={datum[field]}
                      onPaste={e => saveMany(countryIso, pasteUpdate(e, rowIdx, colIdx, fra))}
                      onChange={e => { save(countryIso, datum.name, e.target.value, datum, field, acceptNextDecimal) }}
                      disabled={disabled}
                    />
                  )

              }
            </td>
          )
        })
      }

      <td className="fra-table__row-anchor-cell">
        <div className="fra-table__review-indicator-anchor">
          {
            !disabled &&
            <ReviewIndicator
              key={`${field}_ri`}
              section={section}
              title={rowHeader}
              target={[field]}
              countryIso={countryIso}/>
          }

        </div>
      </td>

    </tr>
  )
}

TableBodyRowField.propTypes = {
  fra: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
  rowIdx: PropTypes.number.isRequired,
}

export default TableBodyRowField
