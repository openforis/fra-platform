import React from 'react'
import PropTypes from 'prop-types'

import CellTotal from '@webapp/app/assessment/fra/sections/forestCharacteristics/tableRows/components/cellTotal'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import useTableRowCssClass
  from '@webapp/app/assessment/fra/components/tableWithOdp/components/hooks/useTableRowCssClass'
import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

const field = 'total'

const RowTotal = props => {
  const { fra, section, disabled } = props
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const rowCssClass = useTableRowCssClass(field)

  return (
    <tr className={rowCssClass}>

      <th className="fra-table__header-cell-left">
        {i18n.t('forestCharacteristics.total')} (a+b)
      </th>

      {
        fra.map((datum, i) => (
          <CellTotal
            key={i}
            datum={datum}
          />
        ))
      }

      <td className="fra-table__row-anchor-cell">
        <div className="fra-table__review-indicator-anchor">
          {
            !disabled &&
            <ReviewIndicator
              section={section}
              title={i18n.t('forestCharacteristics.total')}
              target={[field]}
              countryIso={countryIso}/>
          }
        </div>
      </td>
    </tr>
  )
}

RowTotal.propTypes = {
  fra: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default RowTotal
