import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import * as R from 'ramda'

import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'

import TableBodyCell from '@webapp/app/assessment/fra/components/tableWithOdp/components/tableBodyCell'

const TableBodyRowField = props => {
  const countryIso = useCountryIso()

  const {
    fra, section, row, rowIdx, disabled,
    pasteUpdate,
  } = props

  const { rowHeader, field, className, rowVariable, validator } = row

  const commentsOpen = useSelector(state => {
    const openThreadTarget = ReviewState.getOpenThreadTarget(state)
    return !R.isEmpty(openThreadTarget) && R.isEmpty(R.difference(openThreadTarget, [field]))
  })

  return (
    <tr
      key={field}
      className={`${commentsOpen ? 'fra-row-comments__open' : ''}`}>
      <th className={className ? className : 'fra-table__category-cell'}>
        {rowHeader} {rowVariable}
      </th>
      {
        Object.values(fra).map((datum, colIdx) => (
            <TableBodyCell
              key={colIdx}
              colIdx={colIdx}
              datum={datum}
              fra={fra}
              field={field}
              section={section}
              disabled={disabled}
              rowIdx={rowIdx}
              validator={validator}
              pasteUpdate={pasteUpdate}
            />
          )
        )
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
  section: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
  rowIdx: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  pasteUpdate: PropTypes.func.isRequired,
}

export default TableBodyRowField
