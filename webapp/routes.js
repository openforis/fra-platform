import React from "react"
import { HashRouter as Router, Route, Link } from "react-router-dom"
import Default from "./default"
import ErrorComponent from "./applicationError/errorComponent"
import NationalDataEntry from "./nationalDataEntry/nationalDataEntry"
import OriginalDataPoint from './originalDataPoint/originalDataPoint'

const Routes = () => (
    <Router>
        <div>
            <div className="main__header">
                <img src="/img/FAO_logo.png" height="48"/>
                <Link to="/">FRA Platform</Link>
            </div>
            <ErrorComponent/>
            <div className="main__container">
                <Route exact path="/" component={Default}/>
                <Route exact path="/country/:countryIso" component={NationalDataEntry}/>
                <Route exact path="/country/odp/:countryIso" component={OriginalDataPoint}/>
            </div>
        </div>
    </Router>
)

export default Routes
