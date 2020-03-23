import './appView.less'

import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useParams } from 'react-router-dom'
import * as R from 'ramda'

import CountrySelection from '@webapp/app/components/countrySelection'
import Header from './components/header/header'
import Navigation from './components/navigation/navigation'
import Review from './assessment/components/review/review'
import UserChat from './user/chat/userChatView'
import CountryMessageBoardView from './landing/messageBoard/countryMessageBoardView'
import ErrorComponent from './components/error/errorComponent'
import PrintAssessmentView from './assessment/components/print/printAssessmentView'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import routes from './routes'

import * as CountryState from '@webapp/app/country/countryState'
import * as NavigationState from '@webapp/app/components/navigation/navigationState'

import { fetchCountryInitialData, fetchCountryList } from '@webapp/app/country/actions'

import StatisticalFactsheets from '@webapp/app/statisticalFactsheets'

const isInitialDataLoaded = state => CountryState.hasCountries(state) && CountryState.hasStatus(state) && !R.isEmpty(state.extentOfForest) && !R.isEmpty(state.growingStock)

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

  return (
    <Switch>
      <Route
        exact
        path="/country/:countryIso/print/:assessment/"
        component={PrintAssessmentView}
      />

      <Route
        exact
        path="/statisticalFactsheets"
        component={StatisticalFactsheets}
      />

      <Route>
        {
          userInfo &&
          <>
            <Review/>
            <UserChat/>
            <CountryMessageBoardView/>
          </>
        }
        <div className={`app-view${navigationVisible ? ' navigation-on' : countryIso ? ' navigation-off' : ''}`}>
          <CountrySelection className={navigationVisible ? 'nav-base' : ''}/>
          <Header/>
          <Navigation/>
          <Switch>
            {
              routes.map((route, i) =>
                <Route key={i} {...route} />
              )
            }
          </Switch>
        </div>
        <ErrorComponent/>
      </Route>

    </Switch>
  )

}

export default memo(LoggedInView)
