import { useSelector } from 'react-redux'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

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

  let className = 'fra-table__cell'
  if (type === SectionSpec.TYPES.calculated) className = 'fra-table__calculated-cell'
  if (type === SectionSpec.TYPES.text) className = 'fra-table__cell-left'
  if (type === SectionSpec.TYPES.placeholder) className = 'fra-table__filler-last'

  className += valid ? '' : ' validation-error'

  return className
}
