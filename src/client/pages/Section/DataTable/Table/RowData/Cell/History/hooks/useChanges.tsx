import { useMemo } from 'react'
import { TFunction, useTranslation } from 'react-i18next'

import * as Diff from 'diff'
import { Change } from 'diff'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { Col, ColType } from 'meta/assessment/col'
import { Cols } from 'meta/assessment/cols'
import { Cycle } from 'meta/assessment/cycle'
import { NodeValue } from 'meta/assessment/node'
import { Row } from 'meta/assessment/row'

import { useCycle } from 'client/store/assessment'

type Returned = Array<Change>

interface FormatValueProps {
  nodeValue: NodeValue
  isNumeric: boolean
  row: Row
  col: Col
  cycle: Cycle
  t: TFunction
}

const _formatSelectValue = (nodeValue: NodeValue, col: Col, cycle: Cycle, t: TFunction): string => {
  const { labelKeyPrefix, years } = Cols.getSelectProps({ cycle, col })
  const { raw } = nodeValue
  const options = Cols.getSelectOptions({ cycle, col })

  if (!Objects.isEmpty(years)) {
    return raw
  }

  const getLabel = (value: string) => {
    const optionProps = options.find((option) => option.name === value)
    return optionProps ? Cols.getSelectOptionLabel(optionProps, t, labelKeyPrefix) : value
  }

  if (Array.isArray(raw)) {
    return raw.map(getLabel).join(', ')
  }
  return getLabel(raw)
}

const _formatValue = (props: FormatValueProps): string => {
  const { col, cycle, isNumeric, nodeValue, row, t } = props
  if (Objects.isEmpty(nodeValue?.raw)) return ''
  if (isNumeric) {
    const bigNumber = Numbers.toBigNumber(nodeValue.raw)
    return Numbers.format(bigNumber, row.props?.format?.integer ? 0 : 2).toString()
  }
  if (col.props.colType === ColType.select) {
    return _formatSelectValue(nodeValue, col, cycle, t)
  }
  return nodeValue?.raw ?? ''
}

interface Props {
  nodeValueA: NodeValue
  nodeValueB: NodeValue
  row: Row
  col: Col
}

export const useChanges = (props: Props): Returned => {
  const { col, nodeValueA, nodeValueB, row } = props
  const { t } = useTranslation()
  const cycle = useCycle()

  const isNumeric = useMemo(() => Cols.isNumeric(col), [col])

  return useMemo<Returned>(() => {
    const textA = _formatValue({ nodeValue: nodeValueA, isNumeric, row, col, cycle, t })
    const textB = _formatValue({ nodeValue: nodeValueB, isNumeric, row, col, cycle, t })

    return Diff.diffLines(textA, textB, { ignoreCase: false })
  }, [col, cycle, isNumeric, nodeValueA, nodeValueB, row, t])
}
