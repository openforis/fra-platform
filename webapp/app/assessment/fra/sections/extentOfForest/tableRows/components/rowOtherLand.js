import React from 'react'
import PropTypes from 'prop-types'
import { formatNumber } from '@common/bignumberUtils'
import * as R from 'ramda'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import useTableRowCssClass
  from '@webapp/app/assessment/fra/components/tableWithOdp/components/hooks/useTableRowCssClass'
import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import CellOtherLand from '@webapp/app/assessment/fra/sections/extentOfForest/tableRows/components/cellOtherLand'

const field = 'otherLand'

const RowOtherLand = props => {
  const { fra, section, disabled } = props
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const rowCssClass = useTableRowCssClass(field)

  return (
    <tr className={rowCssClass}>

      <th className="fra-table__header-cell-left">
        {i18n.t('fraClass.otherLand')} (c-a-b)
      </th>

      {
        Object.values(fra).map((datum, i) => (
          <CellOtherLand
            key={i}
            datum={datum}/>
        ))
      }

      <td className="fra-table__row-anchor-cell">
        <div className="fra-table__review-indicator-anchor">
          {
            !disabled &&
            <ReviewIndicator
              key="totalArea"
              section={section}
              title={i18n.t('fraClass.otherLand')}
              target={[field]}
              countryIso={countryIso}/>
          }
        </div>
      </td>
    </tr>
  )
}

RowOtherLand.propTypes = {
  fra: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default RowOtherLand
