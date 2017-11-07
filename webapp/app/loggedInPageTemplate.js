import React from 'react'
import * as R from 'ramda'
import Navigation from '../navigation/navigation'
import Header from '../header/header'
import Review from '../review/review'

import { connect } from 'react-redux'
import ErrorComponent from '../applicationError/errorComponent'

const template = ({children, commentsOpen}) => {
  const containerClass = commentsOpen ? 'fra-view__container commenting-visible' : 'fra-view__container'
  return <div className="app__root">
    <Navigation/>
    <ErrorComponent/>
    <div className={containerClass}>
      { children }
    </div>
    <Header />
    <Review />
  </div>
}

const mapStateToProps = state => ({
  commentsOpen: !!state.review.openThread,
  navigationVisible: state.navigation.navigationVisible
})

export default connect(mapStateToProps)(template)


