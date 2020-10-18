import './country.less'
import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { matchPath, Redirect, Route, Switch, useLocation } from 'react-router-dom'

import FRA from '@common/assessment/fra'
import * as BasePaths from '@webapp/main/basePaths'

import { useNavigationVisible, useUserInfo } from '@webapp/components/hooks'
import Navigation from '@webapp/app/components/navigation/navigation'
import Review from '@webapp/app/assessment/components/review/review'
import UserChat from '@webapp/app/user/chat/userChatView'
import MessageBoardPanel from '@webapp/app/countryLanding/views/messageBoard/messageBoardPanel'

import { toggleNavigation } from '@webapp/app/components/navigation/actions'
import { useInitCountry, useIsCountryStatusLoaded } from '@webapp/store/country'

import AssessmentSectionView from '@webapp/app/assessment/components/section/assessmentSectionView'
import OriginalDataPointView from '@webapp/app/assessment/fra/sections/originalDataPoint/originalDataPointView'
import Assessment from '@webapp/pages/Country/Assessment'
import AdminView from '@webapp/pages/Admin/adminView'
import EditUserView from '@webapp/app/user/userManagement/editUserView'

const Country = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const userInfo = useUserInfo()
  const countryIso = useInitCountry()
  const countryStatusLoaded = useIsCountryStatusLoaded()
  const navigationVisible = useNavigationVisible()

  const countryRootPath = matchPath(pathname, { path: BasePaths.country, exact: true })

  useEffect(() => {
    if (!navigationVisible && countryStatusLoaded) dispatch(toggleNavigation())
  }, [])

  if (!countryStatusLoaded) {
    return null
  }

  if (countryRootPath) {
    return <Redirect to={BasePaths.getAssessmentLink(countryIso, FRA.type)} />
  }

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
            <Route path={BasePaths.assessmentSection} component={AssessmentSectionView} />
            <Route path={[`${BasePaths.odp}:odpId/`, BasePaths.odp]} component={OriginalDataPointView} />
            <Route path={BasePaths.assessment} component={Assessment} />
            <Route path={BasePaths.admin} component={AdminView} />
            <Route path={BasePaths.user} component={EditUserView} />
          </Switch>
        </div>
      </Route>
    </Switch>
  )
}

export default memo(Country)
