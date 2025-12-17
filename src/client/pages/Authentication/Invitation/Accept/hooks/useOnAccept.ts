import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Routes } from 'meta/routes/routes'
import { User } from 'meta/user/user'

import { useAppDispatch } from 'client/store/hooks'
import { UserActions } from 'client/store/user/actions'
import { DataInvitation } from 'client/pages/Authentication/Invitation/hooks/useData'

type Props = {
  data: DataInvitation
}

type Returned = {
  isLoading: boolean
  onAccept: () => Promise<void>
}

export const useOnAccept = (props: Props): Returned => {
  const { data } = props
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const onAccept = useCallback(async () => {
    const { assessmentName, cycleName, userInvitation } = data
    const { countryIso, uuid: invitationUuid } = userInvitation

    setIsLoading(true)
    try {
      const config = { params: { invitationUuid } }
      const { data } = await axios.post<{ user: User }>(ApiEndPoint.User.invitationAccept(), {}, config)
      // On accept, update received user to store and navigate to role assessment/cycle/country
      dispatch(UserActions.setUser(data.user))
      navigate(Routes.Country.generatePath({ assessmentName, countryIso, cycleName }))
    } catch (error) {
      setIsLoading(false)
    }
  }, [data, dispatch, navigate])

  return {
    isLoading,
    onAccept,
  }
}
