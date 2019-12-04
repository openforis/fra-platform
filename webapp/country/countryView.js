import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as R from 'ramda'

import Navigation from '../navigation/navigation'
import Header from '../header/header'
import Review from '../review/review'
import UserChat from '../userChat/userChatView'
import CountryMessageBoardView from '../countryMessageBoard/countryMessageBoardView'
import ErrorComponent from '../applicationError/errorComponent'

import { fetchInitialData } from '../app/actions'

const CountryView = props => {

  const {
    match,
    initialDataLoaded, fetchInitialData
  } = props

  useEffect(() => {
    const countryIso = R.path(['params', 'countryIso'], match)
    fetchInitialData(countryIso)
  }, [])

  return initialDataLoaded && (
    <div className="app__root">
      {/*<Navigation/>*/}
      {/*<div className="fra-view__container">*/}
        OOOO
        {/*{children}*/}
      {/*</div>*/}
      {/*<Header/>*/}
      {/*<Review/>*/}
      {/*<UserChat/>*/}
      {/*<CountryMessageBoardView/>*/}
      {/*<ErrorComponent/>*/}
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

const enhance = compose(
  withRouter,
  connect(mapStateToProps, { fetchInitialData })
)

export default enhance(CountryView)
