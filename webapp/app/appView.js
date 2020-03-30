import './appView.less'

import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useParams } from 'react-router-dom'

import CountrySelection from '@webapp/app/components/countrySelection'
import Header from '@webapp/app/components/header/header'
import Navigation from '@webapp/app/components/navigation/navigation'
import Review from '@webapp/app/assessment/components/review/review'
import UserChat from '@webapp/app/user/chat/userChatView'
import CountryMessageBoardView from '@webapp/app/landing/messageBoard/countryMessageBoardView'
import ErrorComponent from '@webapp/app/components/error/errorComponent'
import PrintAssessmentView from '@webapp/app/assessment/components/print/printAssessmentView'
import StatisticalFactsheets from '@webapp/app/statisticalFactsheets'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

import * as CountryState from '@webapp/app/country/countryState'
import * as NavigationState from '@webapp/app/components/navigation/navigationState'

import { fetchCountryInitialData, fetchCountryList } from '@webapp/app/country/actions'

import routes from './routes'

const isInitialDataLoaded = state => CountryState.hasCountries(state) && CountryState.hasStatus(state)

const LoggedInView = () => {
  const dispatch = useDispatch()
  const { countryIso } = useParams()
  const userInfo = useUserInfo()
  const initialDataLoaded = useSelector(isInitialDataLoaded)
  const navigationVisible = useSelector(NavigationState.isVisible)

  useEffect(() => {
    dispatch(fetchCountryList())
  }, [])

  useEffect(() => {
    if (countryIso) {
      dispatch(fetchCountryInitialData(countryIso))
    }
  }, [countryIso])

  if (countryIso && !initialDataLoaded) {
    return null
  }

  let classNameAppView = 'app-view'
  classNameAppView += navigationVisible ? ' navigation-on' : ''
  classNameAppView += !navigationVisible && countryIso ? ' navigation-off' : ''

  return (
    <Switch>
      <Route exact path="/country/:countryIso/print/:assessment/" component={PrintAssessmentView} />

      <Route exact path="/statisticalFactsheets" component={StatisticalFactsheets} />

      <Route>
        {userInfo && (
          <>
            <Review />
            <UserChat />
            <CountryMessageBoardView />
          </>
        )}
        <div className={classNameAppView}>
          <CountrySelection className={navigationVisible ? 'nav-base' : ''} />
          <Header />
          <Navigation />
          <Switch>
            {routes.map(route => (
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
