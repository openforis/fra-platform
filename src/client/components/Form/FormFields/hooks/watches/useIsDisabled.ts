import { useEffect, useState } from 'react'

import { PropsWatch } from './types'

// isDisabled: check if a field should be disabled
export const useIsDisabled = (props: PropsWatch): boolean => {
  const { fieldDefinition, values } = props
  const { watches = {} } = fieldDefinition
  const { isDisabled } = watches

  const [disabled, setDisabled] = useState<boolean>(false)

  useEffect(() => {
    if (!isDisabled) return

    setDisabled(isDisabled({ values }))
  }, [isDisabled, values])

  return disabled
}
