import React from 'react'
import PropTypes from 'prop-types'

import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useTableRowCssClass
  from '@webapp/app/assessment/fra/components/tableWithOdp/components/hooks/useTableRowCssClass'
import CellTotalLand from '@webapp/app/assessment/fra/sections/extentOfForest/tableRows/components/cellTotalLand'

const field = 'faoStat'

const RowTotalLand = props => {

  const { fra, section, disabled } = props
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const rowCssClass = useTableRowCssClass(field)

  return (
    <tr className={rowCssClass}>
      <th className="fra-table__header-cell-left">
        {i18n.t('extentOfForest.totalLandArea')} (c)
      </th>

      {
        fra.map((datum, i) => (
          <CellTotalLand
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
              key="faoStat"
              section={section}
              title={i18n.t('extentOfForest.totalLandArea')}
              target={[field]}
              countryIso={countryIso}/>
          }
        </div>
      </td>
    </tr>
  )
}

RowTotalLand.propTypes = {
  fra: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default RowTotalLand
