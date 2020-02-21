import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, useParams } from 'react-router-dom'

import Navigation from './navigation/navigation'
import Header from './header/header'
import Review from './review/review'
import UserChat from './userChat/userChatView'
import CountryMessageBoardView from './countryMessageBoard/countryMessageBoardView'
import ErrorComponent from './applicationError/errorComponent'

import routes from './routes'

import { fetchInitialData } from '@webapp/app/actions'

import * as loginStatusChecker from '@webapp/user/loginStatusChecker'
import PrintAssessmentView from './printAssessment/printAssessmentView'

const LoggedInView = props => {

  const { userInfo, fetchInitialData } = props

  const { countryIso } = useParams()

  useEffect(() => {
    // TODO check if this should be removed
    // loginStatusChecker.startPeriodicCheck(60 * 1000)
  }, [])

  useEffect(() => {
    if (countryIso) {
      fetchInitialData(countryIso)
    }
  }, [countryIso])

  return (
    <Switch>

      <Route
        exact
        path="/country/:countryIso/print/:assessment/"
        component={PrintAssessmentView}
      />

      <Route>
        <div className="app__root">
          {
            countryIso &&
            <Navigation/>
          }
          <div className="fra-view__container">
            <Switch>
              {
                routes.map((route, i) => <Route key={i} {...route} />)
              }
            </Switch>
          </div>
          <Header/>

          {
            userInfo &&
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

export default connect(null, { fetchInitialData })(LoggedInView)
