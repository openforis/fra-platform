import { useMemo } from 'react'

import { SelectableColumnNode } from 'client/components/TableNodeExt/types'

type Options = SelectableColumnNode['props']['options']

export const useOptions = (options: Options) => {
  return useMemo(
    () =>
      options.map((option) => ({
        ...option,
        label: option.label.key,
      })),
    [options]
  )
}
