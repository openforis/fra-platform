import React from 'react'
import Header from './navigation/navigation'
import Footer from './footer/footer'
import ErrorComponent from './applicationError/errorComponent'

export default ({children}) => {
  return <div className="app__root">
    <Header/>
    <ErrorComponent/>
    <div className="fra-routes__container">
      { children }
    </div>
    <Footer/>
  </div>
}
