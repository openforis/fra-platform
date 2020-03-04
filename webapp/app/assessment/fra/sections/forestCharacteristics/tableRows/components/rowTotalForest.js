import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import CellTotalForest
  from '@webapp/app/assessment/fra/sections/forestCharacteristics/tableRows/components/cellTotalForest'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import useTableRowCssClass
  from '@webapp/app/assessment/fra/components/tableWithOdp/components/hooks/useTableRowCssClass'
import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

const field = 'totalForestArea'

const RowTotalForest = props => {
  const { fra, section, disabled } = props
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const rowCssClass = useTableRowCssClass(field)

  return (
    <tr className={rowCssClass}>

      <th className="fra-table__header-cell-left">
        <div className="only-print">
          {
            i18n.t('forestCharacteristics.totalForestArea')
          }
        </div>
        <Link to={`/country/${countryIso}/extentOfForest`} className="link no-print">
          {
            i18n.t('forestCharacteristics.totalForestArea')
          }
        </Link>
      </th>

      {
        fra.map((datum, i) => (
          <CellTotalForest
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
              title={i18n.t('forestCharacteristics.totalForestArea')}
              target={[field]}
              countryIso={countryIso}/>
          }
        </div>
      </td>
    </tr>
  )
}

RowTotalForest.propTypes = {
  fra: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default RowTotalForest
