import './country.less'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matchPath, Redirect, Route, Switch, useLocation, useParams } from 'react-router-dom'

import FRA from '@common/assessment/fra'
import * as BasePaths from '@webapp/main/basePaths'

import { useNavigationVisible, useUserInfo } from '@webapp/components/hooks'
import Navigation from '@webapp/app/components/navigation/navigation'
import Review from '@webapp/app/assessment/components/review/review'
import UserChat from '@webapp/app/user/chat/userChatView'
import MessageBoardPanel from '@webapp/app/countryLanding/views/messageBoard/messageBoardPanel'
import AssessmentPrintView from '@webapp/app/assessment/components/print/assessmentPrintView'

import * as CountryState from '@webapp/app/country/countryState'
import { fetchCountryInitialData } from '@webapp/app/country/actions'
import { toggleNavigation } from '@webapp/app/components/navigation/actions'

import AssessmentSectionView from '@webapp/app/assessment/components/section/assessmentSectionView'
import OriginalDataPointView from '@webapp/app/assessment/fra/sections/originalDataPoint/originalDataPointView'
import Assessment from '@webapp/pages/Country/Assessment'
import AdminView from '@webapp/pages/Admin/adminView'
import EditUserView from '@webapp/app/user/userManagement/editUserView'

const LoggedInView = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { countryIso } = useParams()
  const userInfo = useUserInfo()
  const countryStatusLoaded = useSelector(CountryState.hasStatus)
  const navigationVisible = useNavigationVisible()

  const printView = !!matchPath(pathname, { path: BasePaths.assessmentPrint })
  const printOnlyTablesView = !!matchPath(pathname, { path: BasePaths.assessmentPrintOnlyTables, exact: true })
  const countryRootPath = matchPath(pathname, { path: BasePaths.country, exact: true })

  useEffect(() => {
    if (!navigationVisible && countryStatusLoaded) dispatch(toggleNavigation())
  }, [])

  useEffect(() => {
    if (countryIso) dispatch(fetchCountryInitialData(countryIso, printView, printOnlyTablesView))
  }, [countryIso])

  if (!countryStatusLoaded) {
    return null
  }

  if (countryRootPath) {
    return <Redirect to={BasePaths.getAssessmentLink(countryIso, FRA.type)} />
  }

  return (
    <Switch>
      <Route
        exact
        path={[BasePaths.assessmentPrint, BasePaths.assessmentPrintOnlyTables]}
        component={AssessmentPrintView}
      />

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

export default memo(LoggedInView)
