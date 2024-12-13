import { useCallback, useEffect, useState } from 'react'

import { Objects } from 'utils/objects'

import { NodeValue } from 'meta/assessment'
import { Taxon } from 'meta/extData'

import { SelectProps } from 'client/components/Inputs/Select'

import { fetchTaxonData } from './_fetchTaxonData'

type Props = {
  nodeValue: NodeValue
}

type Returned = {
  data: Array<Taxon>
  handleInputChange: SelectProps['onInputChange']
  inputValue: string
  onBlur: SelectProps['onBlur']
  onFocus: SelectProps['onFocus']
}

type FetchTaxonData = (query: string) => Promise<void>

export const useOnInputChange = (props: Props): Returned => {
  const { nodeValue } = props
  const [data, setData] = useState<Array<Taxon>>([])
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    setInputValue(nodeValue.raw ?? '')
  }, [nodeValue.raw])

  const fetchData = useCallback<FetchTaxonData>(async (query) => {
    const data = await fetchTaxonData(query)
    setData(data)
  }, [])

  const handleInputChange = useCallback<SelectProps['onInputChange']>(
    (input, action) => {
      if (action?.action !== 'input-change') return action.prevInputValue
      setInputValue(input)
      fetchData(input)
      return input
    },
    [fetchData]
  )

  const onFocus = useCallback<SelectProps['onFocus']>(() => {
    fetchData(inputValue)
  }, [fetchData, inputValue])

  const onBlur = useCallback<SelectProps['onBlur']>(() => {
    if (Objects.isEmpty(nodeValue.raw)) {
      setInputValue('')
    } else {
      setInputValue(nodeValue.raw)
    }
  }, [nodeValue.raw])

  return {
    data,
    handleInputChange,
    inputValue,
    onBlur,
    onFocus,
  }
}
