import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { useToaster } from 'client/hooks/toaster'
import { FormProps } from 'client/components/Form/types'

export const useOnSuccess = (): FormProps['onSuccess'] => {
  const navigate = useNavigate()
  const { toaster } = useToaster()

  return useCallback<FormProps['onSuccess']>(
    async (_values, response) => {
      const data = await response.json()
      if (data?.message) {
        toaster.info(data.message)
      }
      navigate('/')
    },
    [navigate, toaster]
  )
}
