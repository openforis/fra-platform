import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Default from './default'
import NationalDataEntry from './national-data-entry'

const Routes = () => (
    <Router>
        <div>
            <Route exact path="/" component={Default}/>
            <Route path="/country/:countryIso" component={NationalDataEntry}/>
        </div>
    </Router>
)

export default Routes