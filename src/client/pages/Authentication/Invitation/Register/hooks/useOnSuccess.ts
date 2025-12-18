import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { Routes } from 'meta/routes/routes'

import { useAppDispatch } from 'client/store/hooks'
import { UserActions } from 'client/store/user/actions'
import { FormProps } from 'client/components/Form/types'
import { DataInvitation } from 'client/pages/Authentication/Invitation/hooks/useData'

type Props = {
  data: DataInvitation
}

export const useOnSuccess = (props: Props): FormProps['onSuccess'] => {
  const { data } = props
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return useCallback<NonNullable<FormProps['onSuccess']>>(
    async (_values, response): Promise<void> => {
      if (!data) return

      const { assessmentName, cycleName, userInvitation } = data
      const { countryIso } = userInvitation

      const user = await response.json()
      dispatch(UserActions.setUser(user))
      navigate(Routes.Country.generatePath({ assessmentName, countryIso, cycleName }))
    },
    [data, dispatch, navigate]
  )
}
