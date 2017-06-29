import { applicationError } from '../applicationError/actions'
import * as autosave from '../autosave/actions'
import { removeClassPlaceholder, addNationalClassPlaceHolder } from './originalDataPoint'
import axios from 'axios'

// Drafting

export const dataPointSaveDraftStart = 'originalDataPoint/saveDraft/start'
export const dataPointSaveDraftCompleted = 'originalDataPoint/saveDraft/completed'

export const saveDraft = (countryIso, obj) => dispatch => {
  dispatch(autosave.start)
  dispatch(startSavingDraft(obj))
  dispatch(persistDraft(countryIso, obj))
}

const startSavingDraft = (obj) => ({type: dataPointSaveDraftStart, active: obj})

const persistDraft = (countryIso, odp) => {
  const dispatched = dispatch =>
    axios.post(`/api/odp/draft/?countryIso=${countryIso}`, removeClassPlaceholder(odp)).then((resp) => {
      dispatch(autosave.complete)
      dispatch(saveDraftCompleted(resp.data.odpId))
    }).catch((err) => {
      dispatch(applicationError(err))
    })

  dispatched.meta = {
    debounce: {
      time: 800,
      key: dataPointSaveDraftStart
    }
  }
  return dispatched
}

const saveDraftCompleted = odpId => ({type: dataPointSaveDraftCompleted, odpId})

// clear active

export const clearActiveAction = 'originalDataPoint/clearActive'
export const clearActive = () => ({type: clearActiveAction})

// Delete

export const remove = (countryIso, odpId) => dispatch => {
  axios.delete(`/api/odp/?odpId=${odpId}`)
    .then(() => {
      dispatch({type: clearActiveAction})
      window.location = `#/country/${countryIso}`
    }).catch(err => dispatch(applicationError(err))
  )
}

// Marking drafts

export const markAsActual = (countryIso, odpId) => dispatch =>
  axios.post(`/api/odp/markAsActual/?odpId=${odpId}`).then(resp => {
    dispatch({type: clearActiveAction})
    window.location = `#/country/${countryIso}`
  })
    .catch(err =>
      dispatch(applicationError(err))
    )

// fetching odp's

export const odpFetchCompleted = 'originalDataPoint/fetch/completed'
export const odpListFetchCompleted = 'originalDataPointList/fetch/completed'

export const fetch = (odpId) => dispatch =>
  axios.get(`/api/odp/?odpId=${odpId}`).then(resp => {
    dispatch({type: odpFetchCompleted, active: addNationalClassPlaceHolder(resp.data)})
  })
    .catch(err =>
      dispatch(applicationError(err))
    )
export const fetchOdps = countryIso => dispatch =>
  axios.get(`/api/odp/?countryIso=${countryIso}`).then(resp => {
    dispatch({type: odpListFetchCompleted, data: resp.data})
  })
    .catch(err =>
      dispatch(applicationError(err))
    )

export const copyPreviousNationalClasses = (countryIso, odp) => dispatch => {
  console.log('==== ', odp)
  axios.get(`/api/prevOdp/${countryIso}?year=${odp.year}`).then(resp => {
    const prevOdp = resp.data
    if (prevOdp.nationalClasses)
      console.log('==== prevOdp ', prevOdp)
    else
      dispatch(applicationError(`Unable to find any National data point prior to ${odp.year}`))
  })
}

