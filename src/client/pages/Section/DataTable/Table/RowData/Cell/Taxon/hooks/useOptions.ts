import { useCallback, useEffect, useMemo, useState } from 'react'

import { Objects } from 'utils/objects'

import { NodeValue } from 'meta/assessment'
import { Taxon } from 'meta/extData'

import { Option, SelectProps } from 'client/components/Inputs/Select'

type Props = {
  data: Array<Taxon>
  nodeValue: NodeValue
}

type Returned = {
  isValidNewOption: SelectProps['isValidNewOption']
  options: Array<Option>
  value: string
}

export const useOptions = (props: Props): Returned => {
  const { data, nodeValue } = props

  const [value, setValue] = useState<string>('')

  useEffect(() => {
    setValue(nodeValue?.taxonCode ?? '')
  }, [nodeValue])

  const options = useMemo<Array<Option>>(() => {
    return data.map((taxon) => {
      const label = taxon.scientificName
      const value = taxon.code.toString()
      return { label, value }
    })
  }, [data])

  const isValidNewOption = useCallback<SelectProps['isValidNewOption']>(
    (inputValue: string, value: Array<Option>, options: Array<Option>) => {
      const selectedOption = value?.at(0)

      if (!Objects.isEmpty(selectedOption) && selectedOption.label === inputValue) {
        return false
      }
      if (nodeValue?.raw?.toLocaleLowerCase() === inputValue?.toLocaleLowerCase()) return false
      if (options.some((option) => option.label.toLocaleLowerCase() === inputValue?.toLocaleLowerCase())) return false

      return true
    },
    [nodeValue?.raw]
  )

  return {
    isValidNewOption,
    options,
    value,
  }
}
