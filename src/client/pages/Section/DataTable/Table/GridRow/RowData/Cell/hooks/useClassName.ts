import classNames from 'classnames'

import { Col, Cols, ColType, Cycle, NodeValueValidation, Row } from 'meta/assessment'

type Props = {
  col: Col
  cycle: Cycle
  row: Row
  validation: NodeValueValidation
}

export const useClassName = (props: Props): string => {
  const { cycle, col, row, validation } = props
  const { colType } = col.props

  let className = ''
  if (Cols.isReadOnly({ cycle, col, row })) className = 'calculated'
  if ([ColType.text, ColType.textarea, ColType.select, ColType.taxon].includes(colType)) className = 'left'
  if (colType === ColType.placeholder) className = 'category left'

  return classNames('table-grid__data-cell', className, { 'validation-error': !validation.valid })
}
