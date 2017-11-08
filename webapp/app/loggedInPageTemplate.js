import React from 'react'
import * as R from 'ramda'
import Navigation from '../navigation/navigation'
import Header from '../header/header'
import Review from '../review/review'

import { connect } from 'react-redux'
import ErrorComponent from '../applicationError/errorComponent'

const template = ({children, commentsOpen}) => {
  return <div className="app__root">
    <Navigation/>
    <Header />
    <div className="fra-view__container">
      { children }
    </div>
    <Review />
    <ErrorComponent/>
  </div>
}

const mapStateToProps = state => ({
  commentsOpen: !!state.review.openThread,
  navigationVisible: state.navigation.navigationVisible
})

export default connect(mapStateToProps)(template)


