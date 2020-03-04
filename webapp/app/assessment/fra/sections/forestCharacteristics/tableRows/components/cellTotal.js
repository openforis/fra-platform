import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { formatNumber } from '@common/bignumberUtils'

import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useTableCellClassOdp
  from '@webapp/app/assessment/fra/components/tableWithOdp/components/hooks/useTableCellCssClassOdp'

import * as ForestCharacteristicsState from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsState'
import * as ForestCharacteristicsValidatorState from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsValidatorState'

const CellTotal = props => {
  const { datum } = props
  const { name: year } = datum

  const userInfo = useUserInfo()
  const totalForestArea = useSelector(ForestCharacteristicsState.getTotalForestAreaByYear(year))
  const valid = useSelector(ForestCharacteristicsValidatorState.totalForestAreaNotEqualToExtentOfForest(datum))

  // validation error is hidden in public view
  const cssClassValidation = !userInfo || valid ? '' : 'validation-error'
  const cssClassOdp = useTableCellClassOdp(datum)

  return (
    <td className={`${cssClassOdp} ${cssClassValidation}`}>
      {
        formatNumber(totalForestArea)
      }
    </td>
  )

}

CellTotal.propTypes = {
  datum: PropTypes.object.isRequired
}

export default CellTotal
