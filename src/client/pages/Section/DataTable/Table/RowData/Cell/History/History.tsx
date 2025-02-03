import './History.scss'
import React, { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Col, ColType, Cycles, NodeValue, Row } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useLastApprovedHistoryTableData } from 'client/store/data/hooks/useLastApprovedHistoryTableData'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import DiffText from 'client/components/DiffText'

import { PropsCell } from '../props'

type Returned = Array<Change>

const useIsNumeric = (col: Col) => {
  return [ColType.integer, ColType.decimal, ColType.calculated].includes(col.props.colType)
}

const useChanges = (props: { nodeValueA: NodeValue; nodeValueB: NodeValue; row: Row; col: Col }): Returned => {
  const { nodeValueA, nodeValueB, row, col } = props
  const isNumeric = useIsNumeric(col)
  return useMemo<Returned>(() => {
    const formatValue = (nodeValue: NodeValue) => {
      if (Objects.isEmpty(nodeValue?.raw)) return ''
      if (isNumeric) {
        const bigNumber = Numbers.toBigNumber(nodeValue.raw)
        return Numbers.format(bigNumber, row.props?.format?.integer ? 0 : 2).toString()
      }
      return nodeValue?.raw ?? ''
    }

    const textA = formatValue(nodeValueA)
    const textB = formatValue(nodeValueB)

    return Diff.diffLines(textA, textB, { ignoreCase: false })
  }, [nodeValueA, nodeValueB, isNumeric, row])
}

const History: React.FC<PropsCell> = (props) => {
  const { nodeValue, table, col, row } = props
  const { assessmentName, /* cycleName: cycleNameParam, */ countryIso } = useCountryRouteParams<CountryIso>()
  const assessment = useAssessment()
  const cycle = useCycle()
  const tableName = table.props.name
  const { colName } = col.props
  const { variableName } = row.props
  const isNumeric = useIsNumeric(col)
  const data = useLastApprovedHistoryTableData()

  // TODO: Depending on HistoryLastApprovedInfo, cycleName is either current cycleName or prevCycleName
  // const info: HistoryLastApprovedInfo = useHistoryLastApprovedInfo()
  const prevCycle = Cycles.getPreviousCycle({ assessment, cycle })
  const cycleName = prevCycle?.name

  const nodeValueProps = { assessmentName, cycleName, countryIso, tableName, colName, variableName, data }
  const nodeValueA = RecordAssessmentDatas.getNodeValue(nodeValueProps) ?? ({} as NodeValue)
  const nodeValueB = nodeValue ?? ({} as NodeValue)

  const changes = useChanges({ nodeValueA, nodeValueB, row, col })

  let className = 'input-text disabled table-grid__data-cell-input-text'
  if (isNumeric) className = 'input-text disabled table-grid__data-cell-input-number'
  return <DiffText changes={changes} className={className} />
}

export default History
