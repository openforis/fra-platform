import React from 'react'
import { Link } from 'react-router-dom'
// {/*<Route exact path={match.url} render={() => (*/}
// {/*<h3>No country selected</h3>*/}
// {/*)}/>*/}

const NationalDataEntry = ( { match } ) => (
    <div>
        <Link to="/">Back home</Link>
        
        <h3>{match.params.countryIso}</h3>
    
    </div>
)

export  default NationalDataEntry