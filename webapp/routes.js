import React from "react"
import { HashRouter as Router, Route, Link } from "react-router-dom"
import Default from "./default"
import NationalDataEntry from "./nationalDataEntry/nationalDataEntry"

const Routes = () => (
  <Router>
    <div>
      <div className="main__header">
        <img src="/img/FAO_logo.png" />
        <Link to="/">FRA Platform</Link>
      </div>
      <div className="main__container">
        <Route exact path="/" component={Default}/>
        <Route path="/country/:countryIso" component={NationalDataEntry}/>
      </div>
    </div>
  </Router>
)

export default Routes
