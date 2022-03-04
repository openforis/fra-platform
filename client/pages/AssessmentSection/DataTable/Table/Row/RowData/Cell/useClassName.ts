import { Col, ColType } from '@meta/assessment'

export default (col: Col /* rowIdx: number */): string => {
  const { colType /* validator */ } = col.props
  // const user = useUser()

  const valid = true // TODO useSelector((state) => {
  // if (!user /* || !validator */) {
  //   return true
  // }
  // return false // validator(col.props.index as number, rowIdx)(state)
  // })

  let className = 'fra-table__cell'
  if (colType === ColType.calculated) className = 'fra-table__calculated-cell'
  if ([ColType.text, ColType.textarea, ColType.select].includes(colType)) className = 'fra-table__cell-left'
  // if (colType === ColType.placeholder) className = 'fra-table__category-cell fra-table__filler-last'

  className += valid ? '' : ' validation-error'

  return className
}
