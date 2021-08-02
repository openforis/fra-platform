import { useSelector } from 'react-redux'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import { useUserInfo } from '@webapp/components/hooks'

export default (col: any, rowIdx: any) => {
  const { type, validator } = col
  const userInfo = useUserInfo()

  const valid = useSelector((state) => {
    if (!userInfo || !validator) {
      return true
    }
    return validator(col.idx, rowIdx)(state)
  })

  let className = 'fra-table__cell'
  if (type === SectionSpec.TypeSpec.calculated) className = 'fra-table__calculated-cell'
  if ([SectionSpec.TypeSpec.text, SectionSpec.TypeSpec.textarea, SectionSpec.TypeSpec.select].includes(type))
    className = 'fra-table__cell-left'
  if (type === SectionSpec.TypeSpec.placeholder) className = 'fra-table__category-cell fra-table__filler-last'

  className += valid ? '' : ' validation-error'

  return className
}
