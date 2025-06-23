import { ActionMeta } from 'react-select'

import { Option } from 'client/components/Inputs/Select'

export const useGetValue = () => {
  return (selectedValues: Array<string>, actionMeta: ActionMeta<Option>): Array<string> => {
    const value = actionMeta.option?.value

    if (value === 'none' || value === 'all') {
      return [value]
    }

    return selectedValues.filter((v) => v !== 'all' && v !== 'none')
  }
}
