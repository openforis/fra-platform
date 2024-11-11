import classNames from 'classnames'

import { Col, Cols, ColType, Cycle, NodeValueValidation, Row } from 'meta/assessment'

type Props = {
  cycle: Cycle
  col: Col
  row: Row
  validation: NodeValueValidation
}

export default (props: Props): string => {
  const { cycle, col, row, validation } = props
  const { colType } = col.props

  let className = ''
  if (Cols.isReadOnly({ cycle, col, row })) className = 'calculated'
  if ([ColType.text, ColType.textarea, ColType.select, ColType.taxon].includes(colType)) className = 'left'
  // if (colType === ColType.placeholder) className = 'fra-table__category-cell fra-table__filler-last' // TODO: Investigate ColType.placeholder

  return classNames('table-grid__data-cell', className, { 'validation-error': !validation.valid })
}
