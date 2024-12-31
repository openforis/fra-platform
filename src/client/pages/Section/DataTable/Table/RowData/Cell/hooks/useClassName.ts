import { useMemo } from 'react'

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

  return useMemo<string>(() => {
    const { colType } = col.props

    const isReadOnly = Cols.isReadOnly({ cycle, col, row })
    const isCalculated = Cols.isCalculated({ col, row })
    const isCalculatedInput = isCalculated && colType !== ColType.calculated

    let className = ''
    if (isReadOnly) className = 'readonly'
    if (isCalculatedInput) className = 'calculated-input'
    if ([ColType.text, ColType.textarea, ColType.select, ColType.taxon].includes(colType)) className = 'left'
    if (colType === ColType.placeholder) className = 'category header left'

    return classNames('table-grid__data-cell', className, { 'validation-error': !validation.valid })
  }, [col, cycle, row, validation])
}
