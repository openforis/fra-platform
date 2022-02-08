import { useSelector } from 'react-redux'

import { ColSpec, TypeSpec } from '@webapp/sectionSpec'
import { useUserInfo } from '@webapp/store/user'

export default (col: ColSpec, rowIdx: number): string => {
  const { type, validator } = col
  const userInfo = useUserInfo()

  const valid: boolean = useSelector((state) => {
    if (!userInfo || !validator) {
      return true
    }
    return validator(col.idx as number, rowIdx)(state)
  })

  let className = 'fra-table__cell'
  if (type === TypeSpec.calculated) className = 'fra-table__calculated-cell'
  if ([TypeSpec.text, TypeSpec.textarea, TypeSpec.select].includes(type)) className = 'fra-table__cell-left'
  if (type === TypeSpec.placeholder) className = 'fra-table__category-cell fra-table__filler-last'

  className += valid ? '' : ' validation-error'

  return className
}
