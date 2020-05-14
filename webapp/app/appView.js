import './appView.less'

import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matchPath, Route, Switch, useLocation, useParams } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'
import { batchActions } from '@webapp/main/reduxBatch'

import CountrySelection from '@webapp/app/components/countrySelection'
import Header from '@webapp/app/components/header/header'
import Navigation from '@webapp/app/components/navigation/navigation'
import Review from '@webapp/app/assessment/components/review/review'
import UserChat from '@webapp/app/user/chat/userChatView'
import CountryMessageBoardView from '@webapp/app/landing/messageBoard/countryMessageBoardView'
import ErrorComponent from '@webapp/app/components/error/errorComponent'
import AssessmentPrintView from '@webapp/app/assessment/components/print/assessmentPrintView'
import StatisticalFactsheets from '@webapp/app/statisticalFactsheets'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

import * as CountryState from '@webapp/app/country/countryState'
import * as NavigationState from '@webapp/app/components/navigation/navigationState'

import { fetchCountryInitialData, fetchCountryList } from '@webapp/app/country/actions'
import { useIsDataExportView } from '@webapp/components/hooks'

import routes from './routes'

const LoggedInView = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { countryIso } = useParams()
  const userInfo = useUserInfo()
  const countriesLoaded = useSelector(CountryState.hasCountries)
  const countryStatusLoaded = useSelector(CountryState.hasStatus)
  const isDataExport = useIsDataExportView()
  const navigationVisible = useSelector(NavigationState.isVisible) || isDataExport

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

  let classNameAppView = 'app-view'

  classNameAppView += isDataExport ? ' data-export' : ''
  classNameAppView += navigationVisible ? ' navigation-on' : ''
  classNameAppView += !navigationVisible && countryIso ? ' navigation-off' : ''

  return (
    <Switch>
      <Route
        exact
        path={[BasePaths.assessmentPrint, BasePaths.assessmentPrintOnlyTables]}
        component={AssessmentPrintView}
      />

      <Route exact path={BasePaths.statisticalFactsheets} component={StatisticalFactsheets} />

      <Route>
        {userInfo && (
          <>
            <Review />
            <UserChat />
            <CountryMessageBoardView />
          </>
        )}
        <div className={classNameAppView}>
          {!isDataExport && <CountrySelection className={navigationVisible ? 'nav-base' : ''} />}
          <Header />
          <Navigation />
          <Switch>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} component={route.component} />
            ))}
          </Switch>
        </div>
        <ErrorComponent />
      </Route>
    </Switch>
  )
}

export default memo(LoggedInView)
