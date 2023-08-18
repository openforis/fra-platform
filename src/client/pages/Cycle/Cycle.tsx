import './Cycle.scss'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useCycle } from 'client/store/assessment'
import { useUserCycles } from 'client/store/user'
import { useIsLoginRoute } from 'client/hooks/useIsRoute'

import { useInitAreas } from './hooks/useInitAreas'

const Cycle: React.FC = () => {
  const cycle = useCycle()
  const isLogin = useIsLoginRoute()

  const navigate = useNavigate()
  const userCycles = useUserCycles()
  useInitAreas()

  // TODO: think later
  useEffect(() => {
    // user has no permission to view cycle
    // If user is accessing login page, do not redirect
    if (!isLogin && !userCycles?.find((userCycle) => userCycle.id === cycle.id)) {
      navigate('/')
    }
  }, [userCycles, cycle, navigate, isLogin])

  return <Outlet />
}

export default Cycle
