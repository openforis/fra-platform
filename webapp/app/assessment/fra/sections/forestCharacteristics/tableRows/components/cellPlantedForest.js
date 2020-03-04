import React from 'react'
import PropTypes from 'prop-types'

import { formatNumber, sum } from '@common/bignumberUtils'

import useTableCellClassOdp
  from '@webapp/app/assessment/fra/components/tableWithOdp/components/hooks/useTableCellCssClassOdp'

const CellPlantedForest = props => {
  const { datum } = props
  const { plantationForestArea, otherPlantedForestArea } = datum

  const plantedForestArea = sum([plantationForestArea, otherPlantedForestArea])

  const cssClassOdp = useTableCellClassOdp(datum)

  return (
    <td className={`${cssClassOdp}`}>
      {
        formatNumber(plantedForestArea)
      }
    </td>
  )

}

CellPlantedForest.propTypes = {
  datum: PropTypes.object.isRequired
}

export default CellPlantedForest
