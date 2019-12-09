import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, useParams } from 'react-router-dom'

import * as R from 'ramda'

import Navigation from '../navigation/navigation'
import Header from '../header/header'
import Review from '../review/review'
import UserChat from '../userChat/userChatView'
import CountryMessageBoardView from '../countryMessageBoard/countryMessageBoardView'
import ErrorComponent from '../applicationError/errorComponent'

import routes from './routes'

import { fetchInitialData } from '../app/actions'

const LoggedInView = props => {

  const { initialDataLoaded, fetchInitialData } = props

  const { countryIso } = useParams()

  useEffect(() => {
    fetchInitialData(countryIso)
  }, [countryIso])

  return initialDataLoaded && (
    <div className="app__root">
      <Navigation/>
      <div className="fra-view__container">
      <Switch>
        {
          routes.map((route, i) => <Route exact key={i} {...route}/>)
        }
      </Switch>
      </div>
      <Header/>
      <Review/>
      <UserChat/>
      <CountryMessageBoardView/>
      <ErrorComponent/>
    </div>
  )
}

const mapStateToProps = state => {
  const initialDataLoaded = !!state.user.userInfo
    && !!R.path(['country', 'countries'], state)
    && !R.isEmpty(state.extentOfForest)
    && !R.isEmpty(state.growingStock)

  return { initialDataLoaded }
}

export default connect(mapStateToProps, { fetchInitialData })(LoggedInView)
