import { Col, Cols, ColType, Row } from '@meta/assessment'

import { useNodeValueValidation } from '@client/store/pages/assessmentSection'

type Props = {
  col: Col
  row: Row
  tableName: string
  valid: boolean
}

export default (props: Props): string => {
  const { col, row, tableName, valid } = props
  const { colType } = col.props
  const nodeUpdate = useNodeValueValidation({ tableName })

  const errorHighlight =
    nodeUpdate &&
    nodeUpdate.tableName === tableName &&
    nodeUpdate.variableName === row.props.variableName &&
    nodeUpdate.colName === col.props.colName

  let className = 'fra-table__cell'
  if (Cols.isReadOnly({ col, row })) className = 'fra-table__calculated-cell'
  if ([ColType.text, ColType.textarea, ColType.select, ColType.taxon].includes(colType))
    className = 'fra-table__cell-left'
  if (colType === ColType.placeholder) className = 'fra-table__category-cell fra-table__filler-last'
  if (!valid && !errorHighlight) className += ' validation-error'
  if (!valid && errorHighlight) className += ' validation-error cell-error-highlight'

  return className
}
