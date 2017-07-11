import { applicationError } from '../applicationError/actions'
import * as autosave from '../autosave/actions'
import { removeClassPlaceholder, addNationalClassPlaceHolder, copyNationalClasses } from './originalDataPoint'
import axios from 'axios'

// Drafting

export const odpSaveDraftStart = 'originalDataPoint/saveDraft/start'
export const odpSaveDraftCompleted = 'originalDataPoint/saveDraft/completed'

export const saveDraft = (countryIso, obj) => dispatch => {
  dispatch(autosave.start)
  dispatch(startSavingDraft(obj))
  dispatch(persistDraft(countryIso, obj))
}

const startSavingDraft = (obj) => ({type: odpSaveDraftStart, active: obj})

const persistDraft = (countryIso, odp) => {
  const dispatched = dispatch =>
    axios.post(`/api/odp/draft/?countryIso=${countryIso}&validate=${odp.validationStatus ? 'true' : 'false'}`, removeClassPlaceholder(odp)).then((resp) => {
      dispatch(autosave.complete)
      dispatch(saveDraftCompleted(resp.data.odpId, resp.data.validationStatus))
    }).catch((err) => {
      dispatch(applicationError(err))
    })

  dispatched.meta = {
    debounce: {
      time: 800,
      key: odpSaveDraftStart
    }
  }
  return dispatched
}

const saveDraftCompleted = (odpId, validationStatus) => ({type: odpSaveDraftCompleted, odpId, validationStatus})

// clear active

export const odpClearActiveAction = 'originalDataPoint/clearActive'
export const clearActive = () => ({type: odpClearActiveAction})

// Delete

export const remove = (countryIso, odpId) => dispatch => {
  axios.delete(`/api/odp/?odpId=${odpId}`)
    .then(() => {
      dispatch({type: odpClearActiveAction})
      window.location = `#/country/${countryIso}`
    }).catch(err => dispatch(applicationError(err))
  )
}

// Marking drafts

export const odpValidationStatusFetchCompleted = 'originalDataPoint/validationStatus/fetch/completed'

export const markAsActual = (countryIso, odpId) => dispatch => {
  dispatch(autosave.start)
  axios.post(`/api/odp/markAsActual/?odpId=${odpId}`).then(resp => {
    if (resp.data.valid) {
      dispatch({type: odpClearActiveAction})
      window.location = `#/country/${countryIso}`
    } else {
      dispatch({type: odpValidationStatusFetchCompleted, data: resp.data})
      dispatch(autosave.complete)
    }
  }).catch(err =>
    dispatch(applicationError(err))
  )
}

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
  axios.get(`/api/prevOdp/${countryIso}/${odp.year}`).then(resp => {
    const prevOdp = resp.data
    if (prevOdp.nationalClasses)
      saveDraft(countryIso, copyNationalClasses(odp, prevOdp))(dispatch)
    else
      dispatch(applicationError(`Unable to find any National data point prior to ${odp.year}`))
  })
}

