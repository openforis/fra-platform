import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { formatNumber } from '@common/bignumberUtils'

import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import * as ExtentOfForestValidatorState
  from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestValidatorState'

import useTableCellClassOdp
  from '@webapp/app/assessment/fra/components/tableWithOdp/components/hooks/useTableCellCssClassOdp'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

const CellOtherLand = props => {
  const { datum } = props
  const userInfo = useUserInfo()

  const otherLandArea = useSelector(ExtentOfForestState.getOtherLandArea(datum))
  const areasNotExceedingTotalLandArea = useSelector(ExtentOfForestValidatorState.areasNotExceedingTotalLandAreaValidator(datum))

  // validation error is hidden in public view
  const cssClassValidation = !userInfo || areasNotExceedingTotalLandArea ? '' : 'validation-error'
  const cssClassOdp = useTableCellClassOdp(datum)

  return (
    <td className={`${cssClassOdp} ${cssClassValidation}`}>
      {formatNumber(otherLandArea)}
    </td>
  )

}

CellOtherLand.propTypes = {
  datum: PropTypes.object.isRequired
}

export default CellOtherLand
