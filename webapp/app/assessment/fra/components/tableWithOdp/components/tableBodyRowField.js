import React from 'react'
import PropTypes from 'prop-types'

import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

import TableBodyCell from '@webapp/app/assessment/fra/components/tableWithOdp/components/tableBodyCell'
import useTableRowCssClass
  from '@webapp/app/assessment/fra/components/tableWithOdp/components/hooks/useTableRowCssClass'

const TableBodyRowField = props => {
  const countryIso = useCountryIso()

  const {
    fra, section, row, rowIdx, disabled,
    pasteUpdate,
  } = props

  const { rowHeader, field, className, rowVariable, validator } = row

  const classNameRow = useTableRowCssClass(field)

  return (
    <tr
      key={field}
      className={classNameRow}>
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
