import { useEffect, useState } from 'react'

import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { User } from 'meta/user'

import { useCountryUserRouteParams } from 'client/hooks/useRouteParams'

export const useTargetUser = (): User | undefined => {
  const { assessmentName, cycleName, id } = useCountryUserRouteParams()

  const [user, setUser] = useState<User>()

  useEffect(() => {
    setUser(undefined)

    const params = { assessmentName, cycleName, id }
    axios.get<User>(ApiEndPoint.User.one(), { params }).then((response) => {
      setUser(response.data)
    })
  }, [assessmentName, cycleName, id])

  return user
}
