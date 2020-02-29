import './appView.less'

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, useParams } from 'react-router-dom'
import * as R from 'ramda'

import Navigation from './navigation/navigation'
import Header from './header/header'
import Review from './review/review'
import UserChat from './userChat/userChatView'
import CountryMessageBoardView from './countryMessageBoard/countryMessageBoardView'
import ErrorComponent from './applicationError/errorComponent'
import PrintAssessmentView from './printAssessment/printAssessmentView'
import routes from './routes'

import * as CountryState from '@webapp/country/countryState'
import * as UserState from '@webapp/user/userState'

import { fetchInitialData } from '@webapp/app/actions'
import { getCountryList } from '@webapp/country/actions'

// import * as loginStatusChecker from '@webapp/user/loginStatusChecker'

const LoggedInView = props => {

  const {
    userInfo, initialDataLoaded,
    fetchInitialData, getCountryList
  } = props

  const { countryIso } = useParams()

  // useEffect(() => {
  // TODO check if this should be removed
  // loginStatusChecker.startPeriodicCheck(60 * 1000)
  // }, [])

  useEffect(() => {
    getCountryList()
  }, [])

  useEffect(() => {
    if (countryIso) {
      fetchInitialData(countryIso)
    }
  }, [countryIso])

  return (!countryIso || (countryIso && initialDataLoaded)) && (
    <Switch>

      <Route
        exact
        path="/country/:countryIso/print/:assessment/"
        component={PrintAssessmentView}
      />

      <Route>
        <div className="app-view">
          {
            countryIso &&
            <Navigation/>
          }
          <div className="app-view__container">
            <Header/>
            <Switch>
              {
                routes.map((route, i) =>
                  <Route key={i} {...route} />
                )
              }
            </Switch>
          </div>

          {
            userInfo && countryIso &&
            <>
              <Review/>
              <UserChat/>
              <CountryMessageBoardView/>
            </>
          }

          <ErrorComponent/>
        </div>
      </Route>

    </Switch>
  )
}

const mapStateToProps = state => {
  const initialDataLoaded =
    CountryState.hasCountries(state) &&
    CountryState.hasStatus(state) &&
    !R.isEmpty(state.extentOfForest) &&
    !R.isEmpty(state.growingStock)

  return {
    userInfo: UserState.getUserInfo(state),
    initialDataLoaded
  }
}

export default connect(mapStateToProps, { fetchInitialData, getCountryList })(LoggedInView)
