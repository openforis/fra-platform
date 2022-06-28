import { Col, Cols, ColType, Row } from '@meta/assessment'

type Props = {
  col: Col
  row: Row
  valid: boolean
}

export default (props: Props): string => {
  const { col, row, valid } = props
  const { colType } = col.props

  let className = 'fra-table__cell'
  if (Cols.isReadOnly({ col, row })) className = 'fra-table__calculated-cell'
  if ([ColType.text, ColType.textarea, ColType.select].includes(colType)) className = 'fra-table__cell-left'
  if (colType === ColType.placeholder) className = 'fra-table__category-cell fra-table__filler-last'
  if (!valid) className += ' validation-error'

  return className
}
