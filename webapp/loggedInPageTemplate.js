import React from 'react'
import Navigation from './navigation/navigation'
import Footer from './footer/footer'
import Review from './review/review'
import ErrorComponent from './applicationError/errorComponent'

export default ({children}) => {
  return <div className="app__root">
    <Navigation/>
    <ErrorComponent/>
    <div className="fra-view-content__container">
      { children }
    </div>
    <Review />
    <Footer/>
  </div>
}
