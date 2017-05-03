import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import * as R from 'ramda'

import axios from 'axios'

// {/*<Route exact path={match.url} render={() => (*/}
// {/*<h3>No country selected</h3>*/}
// {/*)}/>*/}

const NationalDataEntry = ({match, msg, changeMsg}) => (
    <div>
        <Link to="/">Back home</Link>
        <h1>{msg}</h1>
        <h3>{match.params.countryIso}</h3>

        <input onChange={(evt) => changeMsg(evt.target.value)}></input>
    </div>
)

const mapstateToProps = R.identity

const changedMsg = newMsg => ({type: 'CHANGE_MSG', newMsg})
const changeStart = () => ({type: 'CHANGE_START'})

const changeMsg = newMsg => dispatch => {
    dispatch(changeStart())
    return axios.post('/api/data', {newMsg}).then(() => {
      dispatch(changedMsg(newMsg))
    })
}

export default connect(mapstateToProps, {changeMsg})(NationalDataEntry)
