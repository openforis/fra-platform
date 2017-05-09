import React from "react"
import { HashRouter as Router, Route } from "react-router-dom"

import Header from "./header/header"
import Default from "./default"
import ErrorComponent from "./applicationError/errorComponent"
import NationalDataEntry from "./nationalDataEntry/nationalDataEntry"
import OriginalDataPoint from './originalDataPoint/originalDataPoint'

const Routes = () => (
    <Router>
        <div>
            <Header/>
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
