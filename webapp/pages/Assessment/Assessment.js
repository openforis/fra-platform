import './assessment.less'
import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'

import { useNavigationVisible, useUserInfo } from '@webapp/components/hooks'
import Navigation from '@webapp/app/components/navigation/navigation'
import Review from '@webapp/app/assessment/components/review/review'
import UserChat from '@webapp/app/user/chat/userChatView'
import MessageBoardPanel from '@webapp/app/countryLanding/views/messageBoard/messageBoardPanel'

import { toggleNavigation } from '@webapp/app/components/navigation/actions'
import { useInitCountry, useIsCountryStatusLoaded } from '@webapp/store/country'

import AssessmentHome from '@webapp/pages/Assessment/AssessmentHome'
import AssessmentSectionView from '@webapp/app/assessment/components/section/assessmentSectionView'
import OriginalDataPointView from '@webapp/app/assessment/fra/sections/originalDataPoint/originalDataPointView'
import AdminView from '@webapp/pages/Admin/adminView'
import EditUserView from '@webapp/app/user/userManagement/editUserView'

const Assessment = () => {
  const dispatch = useDispatch()
  const userInfo = useUserInfo()
  const navigationVisible = useNavigationVisible()
  useInitCountry()
  const countryStatusLoaded = useIsCountryStatusLoaded()

  useEffect(() => {
    if (!navigationVisible && countryStatusLoaded) dispatch(toggleNavigation())
  }, [])

  if (!countryStatusLoaded) return null

  return (
    <Switch>
      <Route>
        {userInfo && (
          <>
            <Review />
            <UserChat />
            <MessageBoardPanel />
          </>
        )}

        <div className={`app-view ${navigationVisible ? ' navigation-on' : ''}`}>
          <Navigation />

          <Switch>
            <Route
              exact
              path={[
                BasePaths.assessmentHome,
                BasePaths.getAssessmentHomeSectionLink(
                  BasePaths.pathFragments.params.countryIso,
                  BasePaths.pathFragments.params.assessmentType,
                  BasePaths.pathFragments.params.section
                ),
              ]}
              component={AssessmentHome}
            />
            <Route exact path={BasePaths.assessmentSection} component={AssessmentSectionView} />
            <Route exact path={[`${BasePaths.odp}:odpId/`, BasePaths.odp]} component={OriginalDataPointView} />
            <Route exact path={BasePaths.admin} component={AdminView} />
            <Route exact path={BasePaths.user} component={EditUserView} />
          </Switch>
        </div>
      </Route>
    </Switch>
  )
}

export default memo(Assessment)
