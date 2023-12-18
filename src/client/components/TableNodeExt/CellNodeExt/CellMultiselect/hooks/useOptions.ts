import { useMemo } from 'react'

import { Option } from 'client/components/Inputs/Select'
import { SelectableColumnNode } from 'client/components/TableNodeExt/types'

type Options = SelectableColumnNode['props']['options']

type Returned = Array<Option>

export const useOptions = (options: Options): Returned => {
  return useMemo<Returned>(
    () =>
      options.map<Option>((option) => ({
        ...option,
        label: option.label.key,
      })),
    [options]
  )
}
