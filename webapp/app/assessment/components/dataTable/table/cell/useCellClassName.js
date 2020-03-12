import { useSelector } from 'react-redux'

import { isPrintingMode } from '@webapp/app/assessment/components/print/printAssessment'

import useUserInfo from '@webapp/components/hooks/useUserInfo'

export default (col, datum) => {
  const { type, validator } = col
  const userInfo = useUserInfo()

  const valid = useSelector(state => {
    if (!userInfo || !validator) {
      return true
    }
    return validator(datum)(state)
  })

  let cssClass = type === 'odp' && !isPrintingMode()
    ? 'odp-value-cell-total'
    : type === 'calculated'
      ? 'fra-table__calculated-cell'
      : 'fra-table__cell'

  cssClass += valid ? '' : ' validation-error'

  return cssClass
}
