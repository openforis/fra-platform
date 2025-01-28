import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { NodeValue } from 'meta/assessment'
import { Taxon } from 'meta/extData'

import { Option } from 'client/components/Inputs/Select'
import { CURRENT_NODE_OPTION_VALUE } from 'client/pages/Section/DataTable/Table/RowData/Cell/Taxon/types'

type Props = {
  data: Array<Taxon>
  inputValue: string
  nodeValue: NodeValue
}

type Returned = Array<Option>

export const useOptions = (props: Props): Returned => {
  const { data, inputValue, nodeValue } = props

  return useMemo<Returned>(() => {
    const options = data.map((taxon) => {
      const label = taxon.scientificName
      const value = taxon.code.toString()
      return { label, value }
    })

    // Add the current node value option if not already present
    if (Objects.isEmpty(nodeValue?.raw)) return options
    if (Objects.isEmpty(inputValue)) return options

    const isCurrentNodeInOptions = options.some(
      (option) => option.value === nodeValue.taxonCode || option.label === nodeValue.raw
    )
    if (isCurrentNodeInOptions) return options

    const currentNodeOption = {
      label: nodeValue.raw,
      value: !Objects.isEmpty(nodeValue.taxonCode) ? nodeValue.taxonCode : CURRENT_NODE_OPTION_VALUE,
    }
    options.unshift(currentNodeOption)

    return options
  }, [data, inputValue, nodeValue])
}
