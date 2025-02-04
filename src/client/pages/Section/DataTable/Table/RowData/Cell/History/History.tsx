import './History.scss'
import React from 'react'

import { CountryIso } from 'meta/area'
import { Cols, Cycles, NodeValue } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useLastApprovedHistoryTableData } from 'client/store/data/hooks/useLastApprovedHistoryTableData'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import DiffText from 'client/components/DiffText'

import { PropsCell } from '../props'
import { useChanges } from './hooks/useChanges'

const History: React.FC<PropsCell> = (props) => {
  const { nodeValue, table, col, row } = props
  const { assessmentName, /* cycleName: cycleNameParam, */ countryIso } = useCountryRouteParams<CountryIso>()
  const assessment = useAssessment()
  const cycle = useCycle()
  const tableName = table.props.name
  const { colName } = col.props
  const { variableName } = row.props
  const isNumeric = Cols.isNumeric(col)
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
