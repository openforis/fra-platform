import React, { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'

import { CountryIso } from 'meta/area'
import { NodeValue } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

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
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const tableName = table.props.name
  const { colName } = col.props
  const { variableName } = row.props
  const data = useLastApprovedHistoryTableData()
  const nodeValueProps = { assessmentName, cycleName, countryIso, tableName, colName, variableName, data }
  const nodeValueA = RecordAssessmentDatas.getNodeValue(nodeValueProps) ?? ({} as NodeValue)
  const nodeValueB = nodeValue ?? ({} as NodeValue)

  const changes = useChanges({ nodeValueA, nodeValueB })

  return <DiffText changes={changes} />
}

export default History
