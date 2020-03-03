import axios from 'axios'

import * as autosave from '@webapp/app/components/autosave/actions'

export const descriptionsFetched = 'descriptions/fetched'

export const fetchDescriptions = (countryIso, section, name) => async dispatch => {
  const { data } = await axios.get(`/api/country/descriptions/${countryIso}/${section}/${name}`)
  dispatch({ type: descriptionsFetched, section, name, data })
}

export const descriptionsChangeStart = 'descriptions/change/start'

export const saveDescriptions = (countryIso, section, name, content) => dispatch => {
  dispatch(startSaveDescriptions(section, name, content))
  dispatch(autosave.start)
  dispatch(changeDescriptions(countryIso, section, name, content))
}

const startSaveDescriptions = (section, name, content) =>
({ type: descriptionsChangeStart, section, name, content })

export const openEditorStart = 'descriptions/editor/open'
export const closeEditorStart = 'descriptions/editor/close'
export const openEditor = (name) => ({ type: openEditorStart, name })
export const closeEditor = () => ({ type: closeEditorStart })

const changeDescriptions = (countryIso, section, name, content) => {
  const dispatched = dispatch => {
    return axios.post(`/api/country/descriptions/${countryIso}/${section}/${name}`, { content }).then(() => {
      dispatch(autosave.complete)
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
