import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'

import Default from './default'
import NationalDataEntry from './nationalDataEntry/nationalDataEntry'

const Routes = () => (
    <Router>
        <div>
            <Route exact path="/" component={Default}/>
            <Route path="/country/:countryIso" component={NationalDataEntry}/>
        </div>
    </Router>
)

export default Routes
