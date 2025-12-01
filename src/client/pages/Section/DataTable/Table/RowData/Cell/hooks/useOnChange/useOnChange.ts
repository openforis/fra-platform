import { useCallback } from 'react'

import { NodeValue } from 'meta/assessment/node'

import { OnChange, Props } from './types'
import { useOnChangeNodeValue } from './useOnChangeNodeValue'

export const useOnChange = (props: Props): OnChange => {
  const { nodeValue: _nodeValue } = props

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { calculated, estimated, estimationUuid, validation, ...nodeValue } = _nodeValue ?? ({} as NodeValue)
  const onChangeNodeValue = useOnChangeNodeValue(props)

  return useCallback<OnChange>(
    (event): void => {
      const { value } = event.target

      onChangeNodeValue({ ...nodeValue, raw: value })
    },
    [nodeValue, onChangeNodeValue]
  )
}
