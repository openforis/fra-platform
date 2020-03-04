import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { formatNumber } from '@common/bignumberUtils'

import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

import useTableCellClassOdp
  from '@webapp/app/assessment/fra/components/tableWithOdp/components/hooks/useTableCellCssClassOdp'

const CellTotalLand = props => {
  const { datum } = props
  const { name: year } = datum

  const faoStatArea = useSelector(ExtentOfForestState.getFaoStatArea(year))

  const cssClassOdp = useTableCellClassOdp(datum)

  return (
    <td className={`${cssClassOdp}`}>
      {formatNumber(faoStatArea)}
    </td>
  )

}

CellTotalLand.propTypes = {
  datum: PropTypes.object.isRequired
}

export default CellTotalLand
