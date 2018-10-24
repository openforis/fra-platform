import React from 'react'

import Navigation from '../navigation/navigation'
import Header from '../header/header'
import Review from '../review/review'
import UserChat from '../userChat/userChatView'
import CountryMessageBoardView from '../countryMessageBoard/countryMessageBoardView'

import { connect } from 'react-redux'
import ErrorComponent from '../applicationError/errorComponent'

const template = ({children, commentsOpen}) => {
  return <div className="app__root">
    <Navigation/>
    <div className="fra-view__container">
      {children}
    </div>
    <Header/>
    <Review/>
    <UserChat/>
    <CountryMessageBoardView/>
    <ErrorComponent/>
  </div>
}

const mapStateToProps = state => ({
  commentsOpen: !!state.review.openThread,
  navigationVisible: state.navigation.navigationVisible
})

export default connect(mapStateToProps)(template)


