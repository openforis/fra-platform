import { useEffect, useState } from 'react'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { User } from 'meta/user/user'

import { useCountryRequestParams } from 'client/hooks/countryRequestParams'
import { useCountryUserRouteParams } from 'client/hooks/routeParams'

export const useTargetUser = (): User | undefined => {
  const { id } = useCountryUserRouteParams()
  const requestParams = useCountryRequestParams()

  const [user, setUser] = useState<User>()

  useEffect(() => {
    setUser(undefined)

    const params = { ...requestParams, id }
    axios.get<User>(ApiEndPoint.User.one(), { params }).then((response) => {
      setUser(response.data)
    })
  }, [id, requestParams])

  return user
}
