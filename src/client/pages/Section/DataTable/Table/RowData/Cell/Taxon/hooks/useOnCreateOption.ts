import { useCallback } from 'react'

import { NodeValue } from 'meta/assessment'

type Props = {
  nodeValue: NodeValue
  onChangeNodeValue: (value: NodeValue) => void
}

type Returned = (value: string) => void

export const useOnCreateOption = (props: Props): Returned => {
  const { nodeValue, onChangeNodeValue } = props

  return useCallback<Returned>(
    (value: string) => {
      const nodeValueUpdate = { ...nodeValue }

      nodeValueUpdate.raw = value
      delete nodeValueUpdate.taxonCode
      onChangeNodeValue(nodeValueUpdate)
    },
    [nodeValue, onChangeNodeValue]
  )
}
