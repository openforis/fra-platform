import React from 'react'
import * as R from 'ramda'
import Navigation from './navigation/navigation'
import Footer from './footer/footer'
import Review from './review/review'

import { connect } from 'react-redux'
import ErrorComponent from './applicationError/errorComponent'

const template = ({children, commentsOpen}) => {
  const containerClass = R.isNil(commentsOpen) ? 'fra-view-content__container' : 'fra-view-content__container-commenting'
  console.log('class', containerClass)
  return <div className="app__root">
    <Navigation/>
    <ErrorComponent/>
    <div className={containerClass}>
      { children }
    </div>
    <Review />
    <Footer/>
  </div>
}

const mapStateToProps = state => ({'commentsOpen': state.review.openThread})

export default connect(mapStateToProps)(template)


