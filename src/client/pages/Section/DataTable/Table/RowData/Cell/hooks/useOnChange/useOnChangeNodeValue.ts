import { useCallback } from 'react'

import { OnChangeNodeValue, Props } from './types'
import useGetAffectedNodes from './useAffectedNodes'
import useDisableAffectedNodes from './useDisableAffectedNodes'
import { usePersistSanitizedValue } from './usePersistSanitizedValue'

export const useOnChangeNodeValue = (props: Props) => {
  const persistSanitizedValue = usePersistSanitizedValue(props)

  const getAffectedNodes = useGetAffectedNodes(props)
  const disableAffectedNodes = useDisableAffectedNodes(props)

  return useCallback<OnChangeNodeValue>(
    (value) => {
      const affected = getAffectedNodes(value)

      if (affected.length > 0) {
        disableAffectedNodes(value)
        return
      }

      persistSanitizedValue(value)
    },
    [disableAffectedNodes, getAffectedNodes, persistSanitizedValue]
  )
}
