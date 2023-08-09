import './Cycle.scss'
import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'
import { AssessmentName, AssessmentNames } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import { useUserCycles } from 'client/store/user'
import { useIsAdmin, useIsLogin, useIsPrint, useIsUserEditPage } from 'client/hooks/useIsPath'
import AssessmentSwitch from 'client/components/AssessmentSwitch'
import PageLayout from 'client/components/PageLayout'
import Partners from 'client/components/Partners'
import Admin from 'client/pages/Admin'
import Overview from 'client/pages/AssessmentHome/PanEuropeanHome/Overview'
import Country from 'client/pages/Country'
import Login from 'client/pages/Login'
import User from 'client/pages/User'

import { useInitAreas } from './hooks/useInitAreas'
import { useInitMetaCache } from './hooks/useInitMetaCache'
import { useInitSections } from './hooks/useInitSections'
import Introduction from './Introduction'
import KeyFindings from './KeyFindings'

const Components: { [key: AssessmentName]: React.FC } = {
  [AssessmentNames.fra]: () => (
    <>
      <Introduction />
      <KeyFindings />
      <Partners />
    </>
  ),
  [AssessmentNames.panEuropean]: Overview,
}

const Cycle: React.FC = () => {
  const { print } = useIsPrint()
  const cycle = useCycle()
  const isAdmin = useIsAdmin()
  const isLogin = useIsLogin()
  const isUserEditPage = useIsUserEditPage()
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

  return (
    <PageLayout withHeader={!print} withToolbar={!isAdmin && !isLogin && !isUserEditPage}>
      <Routes>
        <Route path="" element={<AssessmentSwitch components={Components} />} />
        <Route path={`${ClientRoutes.Assessment.Cycle.Admin.Root.path.relative}/*`} element={<Admin />} />
        <Route path={`${ClientRoutes.Assessment.Cycle.Country.Landing.path.relative}/*`} element={<Country />} />
        <Route path={`${ClientRoutes.Assessment.Cycle.Login.Root.path.relative}/*`} element={<Login />} />
        <Route path={ClientRoutes.Assessment.Cycle.Users.User.path.relative} element={<User />} />
      </Routes>
    </PageLayout>
  )
}

export default Cycle
