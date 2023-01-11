import './Cycle.scss'
import React, { useEffect } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { AssessmentName, AssessmentNames } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { AssessmentActions, useAssessment, useCycle } from '@client/store/assessment'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { useIsAdmin, useIsLogin, useIsPrint, useIsUserEditPage } from '@client/hooks/useIsPath'
import AssessmentSwitch from '@client/components/AssessmentSwitch'
import PageLayout from '@client/components/PageLayout'
import Partners from '@client/components/Partners'
import Description from '@client/pages/AssessmentHome/PanEuropeanHome/Description'

import Admin from '../Admin'
import Country from '../Country'
import Login from '../Login'
import User from '../User'
import Introduction from './Introduction'
import KeyFindings from './KeyFindings'

const TopComponents: { [key: AssessmentName]: React.FC } = {
  [AssessmentNames.fra]: Introduction,
  [AssessmentNames.panEuropean]: Description,
}
const MidComponents: { [key: AssessmentName]: React.FC } = {
  [AssessmentNames.fra]: KeyFindings,
  [AssessmentNames.panEuropean]: () => <div />,
}
const BottomComponents: { [key: AssessmentName]: React.FC } = {
  [AssessmentNames.fra]: Partners,
  [AssessmentNames.panEuropean]: () => <div />,
}

const Cycle: React.FC = () => {
  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()
  const dispatch = useAppDispatch()
  const { print } = useIsPrint()
  const assessment = useAssessment()
  const cycle = useCycle()
  const isAdmin = useIsAdmin()
  const isLogin = useIsLogin()
  const isUserEditPage = useIsUserEditPage()

  useEffect(() => {
    dispatch(AssessmentActions.getAreas({ assessmentName, cycleName }))
    // TODO: reset areas on return
  }, [assessmentName, cycleName, dispatch])

  // On cycle change, reset metadata, data
  useEffect(() => {
    return () => {
      dispatch(AssessmentSectionActions.resetData())
      dispatch(AssessmentSectionActions.reset())
    }
  }, [cycleName, dispatch])

  if (!assessment || !cycle) return null

  return (
    <PageLayout withHeader={!print} withToolbar={!isAdmin && !isLogin && !isUserEditPage}>
      <Routes>
        <Route
          path=""
          element={
            <>
              <AssessmentSwitch components={TopComponents} />
              <AssessmentSwitch components={MidComponents} />
              <AssessmentSwitch components={BottomComponents} />
            </>
          }
        />
        <Route path={`${ClientRoutes.Assessment.Cycle.Admin.Root.path.relative}/*`} element={<Admin />} />
        <Route path={`${ClientRoutes.Assessment.Cycle.Country.Landing.path.relative}/*`} element={<Country />} />
        <Route path={`${ClientRoutes.Assessment.Cycle.Login.Root.path.relative}/*`} element={<Login />} />
        <Route path={ClientRoutes.Assessment.Cycle.Users.User.path.relative} element={<User />} />
      </Routes>
    </PageLayout>
  )
}

export default Cycle
