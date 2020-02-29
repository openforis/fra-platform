import './appView.less'

import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useParams } from 'react-router-dom'
import * as R from 'ramda'

// import Loading from '@webapp/components/loading'
import CountrySelection from '@webapp/loggedin/countrySelection'
import Header from './header/header'
import Navigation from './navigation/navigation'
import Review from './review/review'
import UserChat from './userChat/userChatView'
import CountryMessageBoardView from './countryMessageBoard/countryMessageBoardView'
import ErrorComponent from './applicationError/errorComponent'
import PrintAssessmentView from './printAssessment/printAssessmentView'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import routes from './routes'

import * as CountryState from '@webapp/country/countryState'

import { fetchInitialData } from '@webapp/app/actions'
import { getCountryList } from '@webapp/country/actions'
import * as NavigationState from '@webapp/loggedin/navigation/navigationState'

// import * as loginStatusChecker from '@webapp/user/loginStatusChecker'

const isInitialDataLoaded = state => CountryState.hasCountries(state) && CountryState.hasStatus(state) && !R.isEmpty(state.extentOfForest) && !R.isEmpty(state.growingStock)

const LoggedInView = () => {
  const dispatch = useDispatch()
  const { countryIso } = useParams()
  const userInfo = useUserInfo()
  const initialDataLoaded = useSelector(isInitialDataLoaded)
  const navigationVisible = useSelector(NavigationState.isVisible)

  // useEffect(() => {
  // TODO check if this should be removed
  // loginStatusChecker.startPeriodicCheck(60 * 1000)
  // }, [])

  useEffect(() => {
    dispatch(getCountryList())
  }, [])

  useEffect(() => {
    if (countryIso) {
      dispatch(fetchInitialData(countryIso))
    }
  }, [countryIso])

  if (countryIso && !initialDataLoaded) {
    return null
    // TODO: Check if it looks nice
    // return (
    // <Loading/>
    // )
  }

  return (
    <Switch>
      <Route
        exact
        path="/country/:countryIso/print/:assessment/"
        component={PrintAssessmentView}
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
          {
            navigationVisible &&
            <Navigation/>
          }
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
