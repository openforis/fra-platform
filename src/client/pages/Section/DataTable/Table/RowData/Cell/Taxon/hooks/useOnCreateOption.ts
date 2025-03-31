import { useCallback } from 'react'

import { NodeValue } from 'meta/assessment/node'

import { SelectProps } from 'client/components/Inputs/Select'

type Props = {
  nodeValue: NodeValue
  onChangeNodeValue: (value: NodeValue) => void
}

type Returned = SelectProps['onCreateOption']

export const useOnCreateOption = (props: Props): Returned => {
  const { nodeValue, onChangeNodeValue } = props

  return useCallback<Returned>(
    (value: string) => {
      const nodeValueUpdate = { ...nodeValue }

      nodeValueUpdate.raw = value.trim()
      delete nodeValueUpdate.taxonCode
      onChangeNodeValue(nodeValueUpdate)
    },
    [nodeValue, onChangeNodeValue]
  )
}
