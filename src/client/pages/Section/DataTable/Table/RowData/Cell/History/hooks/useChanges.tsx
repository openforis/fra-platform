import { useMemo } from 'react'
import { TFunction, useTranslation } from 'react-i18next'

import * as Diff from 'diff'
import { Change } from 'diff'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { Col, Cols, ColType, Cycle, NodeValue, Row } from 'meta/assessment'

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
  const { labelKeyPrefix } = Cols.getSelectProps({ cycle, col })
  const { raw } = nodeValue
  if (Array.isArray(raw)) {
    return raw.map((value) => t(`${labelKeyPrefix}.${value}`)).join(', ')
  }
  return t(`${labelKeyPrefix}.${raw}`)
}

const _formatValue = (props: FormatValueProps): string => {
  const { nodeValue, isNumeric, row, col, cycle, t } = props
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
  const { nodeValueA, nodeValueB, row, col } = props
  const { t } = useTranslation()
  const cycle = useCycle()

  const isNumeric = useMemo(() => Cols.isNumeric(col), [col])

  return useMemo<Returned>(() => {
    const textA = _formatValue({ nodeValue: nodeValueA, isNumeric, row, col, cycle, t })
    const textB = _formatValue({ nodeValue: nodeValueB, isNumeric, row, col, cycle, t })

    return Diff.diffLines(textA, textB, { ignoreCase: false })
  }, [nodeValueA, nodeValueB, isNumeric, row, t, cycle, col])
}
