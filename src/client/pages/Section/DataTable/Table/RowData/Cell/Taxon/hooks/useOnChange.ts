import { useCallback } from 'react'

import { NodeValue } from 'meta/assessment'

import { Option } from 'client/components/Inputs/Select'

type Props = {
  nodeValue: NodeValue
  onChangeNodeValue: (value: NodeValue) => void
  options: Array<Option>
}

type Returned = (value: string | null) => void

export const useOnChange = (props: Props): Returned => {
  const { nodeValue, onChangeNodeValue, options } = props

  return useCallback<Returned>(
    (value: string | null) => {
      const nodeValueUpdate = { ...nodeValue }

      if (value === null || value === '') {
        nodeValueUpdate.raw = ''
        delete nodeValueUpdate.taxonCode
        onChangeNodeValue(nodeValueUpdate)
        return
      }

      if (value === nodeValue.taxonCode) return

      const selectedOption = options.find((option) => option.value === value)

      const scientificName = selectedOption.label

      nodeValueUpdate.raw = scientificName
      nodeValueUpdate.taxonCode = value

      onChangeNodeValue(nodeValueUpdate)
    },
    [nodeValue, onChangeNodeValue, options]
  )
}
