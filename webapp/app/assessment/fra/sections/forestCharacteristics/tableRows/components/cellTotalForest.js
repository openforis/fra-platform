import React from 'react'
import PropTypes from 'prop-types'

import { formatNumber } from '@common/bignumberUtils'

import useTableCellClassOdp
  from '@webapp/app/assessment/fra/components/tableWithOdp/components/hooks/useTableCellCssClassOdp'

import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import { useSelector } from 'react-redux'

const CellTotalForest = props => {
  const { datum } = props
  const { name: year } = datum

  const forestArea = useSelector(ExtentOfForestState.getForestAreaByYear(year))

  const cssClassOdp = useTableCellClassOdp(datum)

  return (
    <td className={cssClassOdp}>
      {
        formatNumber(forestArea)
      }
    </td>
  )

}

CellTotalForest.propTypes = {
  datum: PropTypes.object.isRequired
}

export default CellTotalForest
