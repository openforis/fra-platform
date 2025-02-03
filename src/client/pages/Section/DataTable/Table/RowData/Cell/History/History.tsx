import './History.scss'
import React, { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'

import { CountryIso } from 'meta/area'
import { Cycles, NodeValue } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useLastApprovedHistoryTableData } from 'client/store/data/hooks/useLastApprovedHistoryTableData'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import DiffText from 'client/components/DiffText'

import { PropsCell } from '../props'

type Returned = Array<Change>

const useChanges = (props: { nodeValueA: NodeValue; nodeValueB: NodeValue }): Returned => {
  const { nodeValueA, nodeValueB } = props

  return useMemo<Returned>(() => {
    const textA = nodeValueA?.raw ?? ''
    const textB = nodeValueB?.raw ?? ''

    const changes = Diff.diffWords(textA, textB, {
      ignoreCase: false,
    })

    return changes
  }, [nodeValueA.raw, nodeValueB.raw])
}

const History: React.FC<PropsCell> = (props) => {
  const { nodeValue, table, col, row } = props
  const { assessmentName, /* cycleName: cycleNameParam, */ countryIso } = useCountryRouteParams<CountryIso>()
  const assessment = useAssessment()
  const cycle = useCycle()
  const tableName = table.props.name
  const { colName } = col.props
  const { variableName } = row.props
  const data = useLastApprovedHistoryTableData()

  // TODO: Depending on HistoryLastApprovedInfo, cycleName is either current cycleName or prevCycleName
  // const info: HistoryLastApprovedInfo = useHistoryLastApprovedInfo()
  const prevCycle = Cycles.getPreviousCycle({ assessment, cycle })
  const cycleName = prevCycle?.name

  const nodeValueProps = { assessmentName, cycleName, countryIso, tableName, colName, variableName, data }
  const nodeValueA = RecordAssessmentDatas.getNodeValue(nodeValueProps) ?? ({} as NodeValue)
  const nodeValueB = nodeValue ?? ({} as NodeValue)

  const changes = useChanges({ nodeValueA, nodeValueB })

  return (
    <div className="input-text disabled table-grid__data-cell-input-number">
      <DiffText changes={changes} />
    </div>
  )
}

export default History
