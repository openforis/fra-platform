import React from 'react'
import PropTypes from 'prop-types'

import Cell from '@webapp/app/assessment/fra/components/tableWithOdp/components/table/cell'
import useTableRowCssClass
  from '@webapp/app/assessment/fra/components/tableWithOdp/components/hooks/useTableRowCssClass'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

const RowField = props => {
  const countryIso = useCountryIso()
  const i18n = useI18n()

  const {
    fra, section, row, rowIdx, disabled,
    pasteUpdate,
  } = props

  const {
    rowHeaderLabelKey, field, className, rowVariable = '', rowHeaderComponent, validator,
    calculated, calculateFn,
  } = row
  const rowHeader = i18n.t(rowHeaderLabelKey)
  const rowCssClass = useTableRowCssClass(field)

  return (
    <tr
      key={field}
      className={rowCssClass}>
      <th className={className ? className : 'fra-table__category-cell'}>
        {
          rowHeaderComponent
            ? React.createElement(rowHeaderComponent)
            : `${rowHeader} ${rowVariable}`
        }
      </th>
      {
        fra.map((datum, colIdx) => (
            <Cell
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
              calculated={calculated}
              calculateFn={calculateFn}
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

RowField.propTypes = {
  fra: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
  rowIdx: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  pasteUpdate: PropTypes.func.isRequired,
}

export default RowField
