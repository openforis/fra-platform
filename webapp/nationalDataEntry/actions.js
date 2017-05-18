import axios from "axios"

import {applicationError} from "../applicationError/actions"
import * as autosave from "../autosave/actions"

export const valueChangeStart = 'nationalDataEntry/value/change/start'
export const valuesFetched = 'nationalDataEntry/value/fetch/completed'

const fetched = (countryIso, data) => ({
    type: valuesFetched,
    countryIso, data
})

const change = ({countryIso, name, value}) => {
    const dispatched = dispatch => {
        return axios.post(`/api/country/${countryIso}/${name}`, {forestArea: value}).then(() => {
            dispatch(autosave.complete)
        }).catch((err) => {
            dispatch(applicationError(err))
        })
    }
    dispatched.meta = {
        debounce: {
            time: 800,
            key: `valueChangeStart_${name}`
        }
    }
    return dispatched
}

const start = ({name, value}) => ({type: valueChangeStart, name, value})

export const save = (countryIso, name, value) => dispatch => {
    dispatch(start({name, value}))
    dispatch(autosave.start)
    dispatch(change({countryIso, name, value}))
}

export const fetch = (countryIso) => dispatch => {
    axios.get(`/api/country/${countryIso}`).then(resp => {
        dispatch(fetched(countryIso, resp.data))
    })
}

export const generateFraValues = (countryIso) => dispatch => {
    axios.get(`/api/country/generateFraValues/${countryIso}`).then(resp => {
        dispatch(fetch(countryIso))
    })
}