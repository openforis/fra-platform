import axios from 'axios'
import * as autosave from '../autosave/actions'
import { applicationError } from '../applicationError/actions'

export const descriptionsFetched = 'descriptions/fetched'

export const fetchDescriptions = (countryIso, section, name) => dispatch => {
  axios.get(`/api/country/descriptions/${countryIso}/${section}/${name}`)
    .then(resp => dispatch({type: descriptionsFetched, data: resp.data, name}))
    .catch(err => dispatch(applicationError(err)))
}

export const descriptionsChangeStart = 'descriptions/change/start'

export const saveDescriptions = (countryIso, section, name, content) => dispatch => {
  dispatch(startSaveDescriptions(name, content))
  dispatch(autosave.start)
  dispatch(changeDescriptions(countryIso, section, name, content))
}

const startSaveDescriptions = (name, content) => ({type: descriptionsChangeStart, name, content})

export const openEditorStart = 'descriptions/editor/open'
export const closeEditorStart = 'descriptions/editor/close'
export const openEditor = (name) => ({type: openEditorStart, name})
export const closeEditor = (name) => ({type: closeEditorStart, name})

const changeDescriptions = (countryIso, section, name, content) => {
  const dispatched = dispatch => {
    return axios.post(`/api/country/descriptions/${countryIso}/${section}/${name}`, {content}).then(() => {
      dispatch(autosave.complete)
    }).catch((err) => {
      dispatch(applicationError(err))
    })
  }
  dispatched.meta = {
    debounce: {
      time: 800,
      key: `descriptionChangeStart_${name}`
    }
  }
  return dispatched
}
