import { useEffect, useState } from 'react'

import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { User } from 'meta/user/user'

import { useCountryUserRouteParams } from 'client/hooks/routeParams'

export const useTargetUser = (): User | undefined => {
  const { assessmentName, countryIso, cycleName, id } = useCountryUserRouteParams()

  const [user, setUser] = useState<User>()

  useEffect(() => {
    setUser(undefined)

    const params = { assessmentName, cycleName, countryIso, id }
    axios.get<User>(ApiEndPoint.User.one(), { params }).then((response) => {
      setUser(response.data)
    })
  }, [assessmentName, countryIso, cycleName, id])

  return user
}
