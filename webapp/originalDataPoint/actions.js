import axios from 'axios'
import * as R from 'ramda'

import { applicationError } from '../applicationError/actions'
import * as autosave from '../autosave/actions'
import { removeClassPlaceholder, addNationalClassPlaceHolder, copyNationalClasses } from './originalDataPoint'
import {validateDataPoint} from '../../common/originalDataPointCommon'
import { fetchNavStatus } from '../navigation/actions'

// Validation
export const odpValidationCompleted = 'originalDataPoint/validationStatus/completed'
const validationCompleted = validationStatus => ({type: odpValidationCompleted, data: validationStatus})

// Drafting

export const odpSaveDraftStart = 'originalDataPoint/saveDraft/start'
export const odpSaveDraftCompleted = 'originalDataPoint/saveDraft/completed'

export const saveDraft = (countryIso, obj) => dispatch => {
  dispatch(autosave.start)
  dispatch(startSavingDraft(obj))
  dispatch(persistDraft(countryIso, obj))
  if (obj.validationStatus)
    dispatch(validationCompleted(validateDataPoint(obj)))
}

const startSavingDraft = (obj) => ({type: odpSaveDraftStart, active: obj})

const persistDraft = (countryIso, odp) => {
  const dispatched = dispatch => {
    axios.post(`/api/odp/draft/?countryIso=${countryIso}`, removeClassPlaceholder(odp)).then((resp) => {
      dispatch(autosave.complete)
      dispatch(saveDraftCompleted(resp.data.odpId))
    }).catch((err) => {
      dispatch(applicationError(err))
    })
  }

  dispatched.meta = {
    debounce: {
      time: 800,
      key: odpSaveDraftStart
    }
  }
  return dispatched
}

const saveDraftCompleted = odpId => ({type: odpSaveDraftCompleted, odpId})

// clear active

export const odpClearActiveAction = 'originalDataPoint/clearActive'
export const clearActive = () => ({type: odpClearActiveAction})

// Delete

export const remove = (countryIso, odpId) => dispatch => {
  axios.delete(`/api/odp/?odpId=${odpId}&countryIso=${countryIso}`)
    .then(() => {
      dispatch({type: odpClearActiveAction})
      fetchNavStatus(countryIso)(dispatch)
      window.location = `#/country/${countryIso}`
    }).catch(err => dispatch(applicationError(err))
  )
}

// Marking drafts

export const markAsActual = (countryIso, odp) => dispatch => {
  const validationStatus = validateDataPoint(odp)
  dispatch(validationCompleted(validationStatus))

  if (validationStatus.valid) {
    dispatch(autosave.start)
    axios.post(`/api/odp/markAsActual/?odpId=${odp.odpId}`).then(resp => {
      dispatch(autosave.complete)
      dispatch({type: odpClearActiveAction})
      fetchNavStatus(countryIso)(dispatch)
      window.location = `#/country/${countryIso}`
    }).catch(err =>
      dispatch(applicationError(err))
    )
  }
}

// fetching odp's

export const odpFetchCompleted = 'originalDataPoint/fetch/completed'
export const odpListFetchCompleted = 'originalDataPointList/fetch/completed'

export const fetch = (odpId, countryIso) => dispatch =>
  axios.get(`/api/odp/?${R.isNil(odpId) ? '' : `odpId=${odpId}&`}countryIso=${countryIso}`).then(resp => {
    if (R.isNil(odpId)) {
      dispatch({type: odpClearActiveAction, data: resp.data})
    }
    else {
      const odp = addNationalClassPlaceHolder(resp.data)
      dispatch({type: odpFetchCompleted, active: odp})
      dispatch(validationCompleted(validateDataPoint(odp)))
    }
  })
    .catch(err =>
      dispatch(applicationError(err))
    )
export const fetchOdps = countryIso => dispatch =>
  axios.get(`/api/odps/${countryIso}`).then(resp => {
    dispatch({type: odpListFetchCompleted, data: resp.data})
  }).catch(err =>
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

export const cancelDraft = (countryIso, odpId) => dispatch => {
  if (odpId)
    axios.delete(`/api/odp/draft/?odpId=${odpId}&countryIso=${countryIso}`)
      .then(() => window.location = `#/country/${countryIso}`)
      .catch((err) => dispatch(applicationError(err)))
  else
    window.location = `#/country/${countryIso}`
}

