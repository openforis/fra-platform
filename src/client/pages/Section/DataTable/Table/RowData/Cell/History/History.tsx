import React, { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'

import { NodeValue } from 'meta/assessment'

import DiffText from 'client/components/DiffText'

import { PropsCell } from '../props'

type Returned = Array<Change>

const useChanges = (props: { nodeValueA: NodeValue; nodeValueB: NodeValue }): Returned => {
  const { nodeValueA, nodeValueB } = props

  return useMemo<Returned>(() => {
    const textA = nodeValueA?.raw ?? ''
    const textB = nodeValueB?.raw ?? ''

    const changes = Diff.diffChars(textA, textB, {
      ignoreCase: false,
    })

    return changes
  }, [nodeValueA.raw, nodeValueB.raw])
}

const History: React.FC<PropsCell> = (props) => {
  const { nodeValue } = props

  const nodeValueA = {} as NodeValue
  const nodeValueB = nodeValue

  const changes = useChanges({ nodeValueA, nodeValueB })

  return <DiffText changes={changes} />
}

export default History
