import { useSelector } from 'react-redux'

import useUserInfo from '@webapp/components/hooks/useUserInfo'

export default (col, rowIdx) => {
  const { type, validator } = col
  const userInfo = useUserInfo()

  const valid = useSelector(state => {
    if (!userInfo || !validator) {
      return true
    }
    return validator(col.idx, rowIdx)(state)
  })

  let className = type === 'calculated' ? 'fra-table__calculated-cell' : 'fra-table__cell'
  className += valid ? '' : ' validation-error'

  return className
}
