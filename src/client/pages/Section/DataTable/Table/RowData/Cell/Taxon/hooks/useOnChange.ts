import { useCallback } from 'react'

import { NodeValue } from 'meta/assessment/node'
import { Objects } from 'utils/objects'

import { Option } from 'client/components/Inputs/Select'
import { CURRENT_NODE_OPTION_VALUE } from 'client/pages/Section/DataTable/Table/RowData/Cell/Taxon/types'

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

      if (value === CURRENT_NODE_OPTION_VALUE) return

      if (Objects.isEmpty(value)) {
        nodeValueUpdate.raw = ''
        delete nodeValueUpdate.taxonCode
        onChangeNodeValue(nodeValueUpdate)
        return
      }

      if (value === nodeValue.taxonCode) return

      const selectedOption = options.find((option) => option.value === value)
      if (!selectedOption) return

      const scientificName = selectedOption.label

      nodeValueUpdate.raw = scientificName
      nodeValueUpdate.taxonCode = value

      onChangeNodeValue(nodeValueUpdate)
    },
    [nodeValue, onChangeNodeValue, options]
  )
}
