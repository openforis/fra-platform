import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import * as R from 'ramda'

// {/*<Route exact path={match.url} render={() => (*/}
// {/*<h3>No country selected</h3>*/}
// {/*)}/>*/}

const NationalDataEntry = ({match, msg} ) => (
    <div>
        <Link to="/">Back home</Link>
        <h1>{msg}</h1>
        <h3>{match.params.countryIso}</h3>

        <input></input>
    </div>
)

const mapstateToProps = R.identity

export default connect(mapstateToProps)(NationalDataEntry)
