import { useMemo } from 'react'

import classNames from 'classnames'

import { Col, Cols, ColType, NodeValueValidation, Row } from 'meta/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { useHistoryLastApprovedIsActive } from 'client/store/data'

type Props = {
  col: Col
  cycle: Cycle
  row: Row
  validation: NodeValueValidation
}

export const useClassName = (props: Props): string => {
  const { cycle, col, row, validation } = props
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()

  return useMemo<string>(() => {
    const { colType } = col.props

    const isPlaceholder = colType === ColType.placeholder
    const isTextInput = [ColType.text, ColType.textarea, ColType.select, ColType.taxon].includes(colType)
    const isCalculated = Cols.isCalculated({ col, row })
    const isCalculatedInput = isCalculated && colType !== ColType.calculated
    const isReadOnly = Cols.isReadOnly({ cycle, col, row }) && !isCalculatedInput

    // Validation is hidden when history is active
    const validationError = !historyLastApprovedIsActive && !validation.valid

    return classNames(
      'table-grid__data-cell',
      { 'validation-error': validationError },
      {
        'calculated-input': isCalculatedInput && !isTextInput,
        'category header left': isPlaceholder,
        left: isTextInput,
        readonly: isReadOnly,
      }
    )
  }, [col, cycle, row, validation, historyLastApprovedIsActive])
}
