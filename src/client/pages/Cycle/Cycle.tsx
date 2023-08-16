import './Cycle.scss'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useCycle } from 'client/store/assessment'
import { useUserCycles } from 'client/store/user'
import { useIsLogin } from 'client/hooks/useIsPath'

import { useInitAreas } from './hooks/useInitAreas'
import { useInitMetaCache } from './hooks/useInitMetaCache'
import { useInitSections } from './hooks/useInitSections'

const Cycle: React.FC = () => {
  const cycle = useCycle()
  const isLogin = useIsLogin()

  const navigate = useNavigate()
  const userCycles = useUserCycles()
  useInitSections()
  useInitMetaCache()
  useInitAreas()

  // TODO: think later
  useEffect(() => {
    // user has no permission to view cycle
    // If user is accessing login page, do not redirect
    if (!isLogin && !userCycles?.find((userCycle) => userCycle.id === cycle.id)) {
      navigate('/')
    }
  }, [userCycles, cycle, navigate, isLogin])

  // return (
  //   <PageLayout withHeader={!print} withToolbar={!isAdmin && !isLogin && !isUserEditPage}>
  //     <Routes>
  //       <Route path="" element={<AssessmentSwitch components={Components} />} />
  //       <Route path={`${ClientRoutes.Assessment.Cycle.Admin.Root.path.relative}/*`} element={<Admin />} />
  //       <Route path={`${ClientRoutes.Assessment.Cycle.Country.Landing.path.relative}/*`} element={<Country />} />
  //       <Route path={`${ClientRoutes.Assessment.Cycle.Login.Root.path.relative}/*`} element={<Login />} />
  //       <Route path={ClientRoutes.Assessment.Cycle.Users.User.path.relative} element={<User />} />
  //     </Routes>
  //   </PageLayout>
  // )

  // return <PageLayout withHeader={!print} withToolbar={!isAdmin && !isLogin && !isUserEditPage} />

  return <Outlet />
}

export default Cycle
