import './assessment.scss'
import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import { toggleNavigation } from '@webapp/components/Navigation/actions'
import { useInitCountry, useIsCountryStatusLoaded } from '@webapp/store/country'
import * as BasePaths from '@webapp/main/basePaths'
import { Breakpoints } from '@webapp/utils/breakpoints'
import { useCountryIso, useNavigationVisible, useUserInfo } from '@webapp/components/hooks'

import MessageBoardPanel from '@webapp/app/countryLanding/views/messageBoard/messageBoardPanel'
import Navigation from '@webapp/components/Navigation'
import Review from '@webapp/app/assessment/components/review/review'
import UserChat from '@webapp/app/user/chat/userChatView'
import OriginalDataPointView from '@webapp/app/assessment/fra/sections/originalDataPoint/originalDataPointView'
import AssessmentHome from '../AssessmentHome'
import AssessmentDataDownload from '../AssessmentDataDownload'
import AssessmentSection from '../AssessmentSection'

const Assessment = () => {
  const dispatch = useDispatch()
  const userInfo = useUserInfo()
  const navigationVisible = useNavigationVisible()
  const countryStatusLoaded = useIsCountryStatusLoaded()
  const countryIso = useCountryIso()
  const laptop = useMediaQuery({ minWidth: Breakpoints.laptop })
  useInitCountry()

  useEffect(() => {
    if (!navigationVisible && countryStatusLoaded && laptop) dispatch(toggleNavigation())
  }, [])

  // This is required - otherwise app will crash on slow connections or builds
  if (!countryIso) {
    return null
  }

  return (
    <>
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
          <Route path={BasePaths.assessmentHome} component={AssessmentHome} />
          <Route path={BasePaths.assessmentDataDownload} component={AssessmentDataDownload} />
          <Route exact path={BasePaths.assessmentSection} component={AssessmentSection} />
          <Route exact path={[`${BasePaths.odp}:odpId/`, BasePaths.odp]} component={OriginalDataPointView} />
        </Switch>
      </div>
    </>
  )
}

export default memo(Assessment)
