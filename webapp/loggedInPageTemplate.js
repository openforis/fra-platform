import React from 'react'
import Navigation from './navigation/navigation'
import Footer from './footer/footer'
import ErrorComponent from './applicationError/errorComponent'

export default ({children}) => {
  return <div className="app__root">
    <Navigation/>
    <ErrorComponent/>
    <div className="fra-view-content__container">
      { children }
    </div>
    <Footer/>
  </div>
}
