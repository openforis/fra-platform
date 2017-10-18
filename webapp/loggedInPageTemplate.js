import React from 'react'
import * as R from 'ramda'
import Navigation from './navigation/navigation'
import Footer from './footer/footer'
import Review from './review/review'

import { connect } from 'react-redux'
import ErrorComponent from './applicationError/errorComponent'

const template = ({children, commentsOpen}) => {
  const containerClass = R.isNil(commentsOpen) ? 'fra-view__container' : 'fra-view__container-commenting'
  const footerWidth = R.isNil(commentsOpen) ? 256: 544
  return <div className="app__root">
    <Navigation/>
    <ErrorComponent/>
    <div className={containerClass}>
      { children }
    </div>
    <Footer width={footerWidth} />
    <Review />
  </div>
}

const mapStateToProps = state => ({'commentsOpen': state.review.openThread})

export default connect(mapStateToProps)(template)


