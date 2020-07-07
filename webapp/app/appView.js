import './appView.less'
import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matchPath, Route, Switch, useLocation, useParams } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'
import { batchActions } from '@webapp/main/reduxBatch'

import { useNavigationVisible, useUserInfo } from '@webapp/components/hooks'
import Header from '@webapp/app/components/header/header'
import CountrySelection from '@webapp/app/components/countrySelection'
import Navigation from '@webapp/app/components/navigation/navigation'
import Review from '@webapp/app/assessment/components/review/review'
import UserChat from '@webapp/app/user/chat/userChatView'
import MessageBoardPanel from '@webapp/app/countryLanding/views/messageBoard/messageBoardPanel'
import ErrorComponent from '@webapp/app/components/error/errorComponent'
import AssessmentPrintView from '@webapp/app/assessment/components/print/assessmentPrintView'

import * as CountryState from '@webapp/app/country/countryState'
import { fetchCountryInitialData, fetchCountryList } from '@webapp/app/country/actions'

import routes from './routes'

const LoggedInView = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { countryIso } = useParams()
  const userInfo = useUserInfo()
  const countriesLoaded = useSelector(CountryState.hasCountries)
  const countryStatusLoaded = useSelector(CountryState.hasStatus)
  const navigationVisible = useNavigationVisible()

  const printView = !!matchPath(pathname, { path: BasePaths.assessmentPrint })
  const printOnlyTablesView = !!matchPath(pathname, { path: BasePaths.assessmentPrintOnlyTables, exact: true })

  const initialDataLoaded = countryStatusLoaded && countriesLoaded

  useEffect(() => {
    const actions = []
    if (!countriesLoaded) {
      actions.push(fetchCountryList())
    }
    if (countryIso) {
      actions.push(fetchCountryInitialData(countryIso, printView, printOnlyTablesView))
    }
    dispatch(batchActions(actions))
  }, [countryIso])

  if (countryIso && !initialDataLoaded) {
    return null
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
        <div className="app-view">
          <Header />
          <div className={`app-view__container ${navigationVisible ? ' navigation-on' : ''}`}>
            <Navigation />
            <CountrySelection />
            <Switch>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} component={route.component} />
              ))}
            </Switch>
          </div>
        </div>
        <ErrorComponent />
      </Route>
    </Switch>
  )
}

export default memo(LoggedInView)
