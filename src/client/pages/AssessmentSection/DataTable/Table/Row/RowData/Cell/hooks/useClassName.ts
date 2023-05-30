import { Col, Cols, ColType, Cycle, Row } from '@meta/assessment'

type Props = {
  cycle: Cycle
  col: Col
  row: Row
}

export default (props: Props): string => {
  const { cycle, col, row } = props
  const { colType } = col.props

  let className = 'fra-table__cell'
  if (Cols.isReadOnly({ cycle, col, row })) className = 'fra-table__calculated-cell'
  if ([ColType.text, ColType.textarea, ColType.select, ColType.taxon].includes(colType))
    className = 'fra-table__cell-left'
  if (colType === ColType.placeholder) className = 'fra-table__category-cell fra-table__filler-last'

  return className
}
