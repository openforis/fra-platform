import React, { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'

import { NodeValue } from 'meta/assessment'

import { useLastApprovedHistoryTableData } from 'client/store/data/hooks/useLastApprovedHistoryTableData'
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
  const tableDataHistory = useLastApprovedHistoryTableData()
  const nodeValueA =
    tableDataHistory?.[table.props.name]?.[col.props.colName]?.[row.props.variableName] ?? ({} as NodeValue)
  const nodeValueB = nodeValue ?? ({} as NodeValue)

  const changes = useChanges({ nodeValueA, nodeValueB })

  return <DiffText changes={changes} />
}

export default History
