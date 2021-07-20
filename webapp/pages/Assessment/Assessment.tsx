import './assessment.scss'
import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import MediaQuery from 'react-responsive'

import * as BasePaths from '@webapp/main/basePaths'
import { Breakpoints } from '@webapp/utils/breakpoints'

import { useNavigationVisible, useUserInfo } from '@webapp/components/hooks'
import Navigation from '@webapp/app/components/navigation/navigation'
import Review from '@webapp/app/assessment/components/review/review'
import UserChat from '@webapp/app/user/chat/userChatView'
import MessageBoardPanel from '@webapp/app/countryLanding/views/messageBoard/messageBoardPanel'

import { toggleNavigation } from '@webapp/app/components/navigation/actions'
import { useInitCountry, useIsCountryStatusLoaded } from '@webapp/store/country'

import AssessmentSectionView from '@webapp/app/assessment/components/section/assessmentSectionView'
import OriginalDataPointView from '@webapp/app/assessment/fra/sections/originalDataPoint/originalDataPointView'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

import AssessmentHome from '../AssessmentHome'
import AssessmentDataDownload from '../AssessmentDataDownload'

const Assessment = () => {
  const dispatch = useDispatch()
  const userInfo = useUserInfo()
  const navigationVisible = useNavigationVisible()
  const countryStatusLoaded = useIsCountryStatusLoaded()
  const countryIso = useCountryIso()
  useInitCountry()

  useEffect(() => {
    if (!navigationVisible && countryStatusLoaded) dispatch(toggleNavigation())
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
        <MediaQuery minWidth={Breakpoints.laptop}>
          <Navigation />
        </MediaQuery>

        <Switch>
          <Route path={BasePaths.assessmentHome} component={AssessmentHome} />
          <Route path={BasePaths.assessmentDataDownload} component={AssessmentDataDownload} />
          <Route exact path={BasePaths.assessmentSection} component={AssessmentSectionView} />
          <Route exact path={[`${BasePaths.odp}:odpId/`, BasePaths.odp]} component={OriginalDataPointView} />
        </Switch>
      </div>
    </>
  )
}

export default memo(Assessment)
