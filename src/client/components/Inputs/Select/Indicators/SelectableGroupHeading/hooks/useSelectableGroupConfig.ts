import { useMemo } from 'react'
import { GroupHeadingProps } from 'react-select'

import { Option } from 'client/components/Inputs/Select/types'

type Props = GroupHeadingProps<Option>

type Returned = {
  checked: boolean
  isInputIndeterminate: boolean
}

export const useSelectableGroupConfig = (props: Props): Returned => {
  const { data, selectProps } = props
  const { value } = selectProps

  const selectedValues = useMemo<Array<string>>(
    () => (Array.isArray(value) ? value.map((opt) => opt.value) : []),
    [value]
  )

  const groupOptionValues = useMemo<Array<string>>(() => data.options.map((option) => option.value), [data.options])

  return useMemo<Returned>(() => {
    const selectedCount = groupOptionValues.filter((val) => selectedValues.includes(val)).length

    return {
      checked: selectedCount === groupOptionValues.length,
      isInputIndeterminate: selectedCount > 0 && selectedCount < groupOptionValues.length,
    }
  }, [selectedValues, groupOptionValues])
}
