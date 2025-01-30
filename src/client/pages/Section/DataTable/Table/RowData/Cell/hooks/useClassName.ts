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

    const isPlaceholder = colType === ColType.placeholder
    const isTextInput = [ColType.text, ColType.textarea, ColType.select, ColType.taxon].includes(colType)
    const isCalculated = Cols.isCalculated({ col, row })
    const isCalculatedInput = isCalculated && colType !== ColType.calculated
    const isReadOnly = Cols.isReadOnly({ cycle, col, row }) && !isCalculatedInput

    return classNames(
      'table-grid__data-cell',
      { 'validation-error': !validation.valid },
      {
        'calculated-input': isCalculatedInput && !isTextInput,
        'category header left': isPlaceholder,
        left: isTextInput,
        readonly: isReadOnly,
      }
    )
  }, [col, cycle, row, validation])
}
