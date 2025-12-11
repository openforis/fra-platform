import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { useToaster } from 'client/hooks/toaster'
import { FormProps } from 'client/components/Form/types'

export const useOnSuccess = (): FormProps['onSuccess'] => {
  const { toaster } = useToaster()

  const navigate = useNavigate()

  return useCallback<FormProps['onSuccess']>(
    async (_values, response) => {
      const data = await response.json()
      if (data?.message) {
        toaster.info(data.message)
      }

      // TODO: #5507
      // if (data?.user) {
      // const redirectUrl = Routes.Country.generatePath({ assessmentName, countryIso, cycleName })
      //   dispatch(UserActions.setUser(data.user))
      // }
      navigate('/')
    },
    [navigate, toaster]
  )
}
