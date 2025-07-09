import { useEffect, useState } from 'react'

import { FieldProps } from 'client/components/Form/FormFields/types'

export const useIsFieldDisabled = (props: FieldProps): boolean => {
  const { fieldDefinition, watch } = props
  const { isDisabled } = fieldDefinition

  const values = watch()
  const [disabled, setDisabled] = useState<boolean>(false)

  useEffect(() => {
    if (isDisabled) {
      setDisabled(isDisabled(values))
    }
  }, [isDisabled, values])

  return disabled
}
