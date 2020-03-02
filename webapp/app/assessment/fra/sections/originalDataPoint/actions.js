import axios from 'axios'
import * as R from 'ramda'

import { applicationError } from '@webapp/app/components/error/actions'
import * as autosave from '../../../../components/autosave/actions'
import {
  removeClassPlaceholder,
  addNationalClassPlaceHolder,
  copyNationalClassDefinitions
} from './originalDataPoint'
import { validateDataPoint } from '@common/validateOriginalDataPoint'
import { fetchCountryOverviewStatus } from '../../../../country/actions'
import { markOdpDirty } from '../../components/tableWithOdp/actions'

// Validation
export const odpValidationCompleted = 'originalDataPoint/validationStatus/completed'
const validationCompleted = validationStatus => ({type: odpValidationCompleted, data: validationStatus})

// Drafting

export const odpSaveDraftStart = 'originalDataPoint/saveDraft/start'
export const odpSaveDraftCompleted = 'originalDataPoint/saveDraft/completed'

export const saveDraft = (countryIso, obj) => dispatch => {
  dispatch(startSavingDraft(obj))
  if (!obj.year) {
    return
  }
  dispatch(autosave.start)
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
      time: 400,
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

export const remove = (countryIso, odpId, destination) => dispatch => {
  axios.delete(`/api/odp/?odpId=${odpId}&countryIso=${countryIso}`)
    .then(() => {
      dispatch({type: odpClearActiveAction})
      dispatch(fetchCountryOverviewStatus(countryIso))
      window.location = `/country/${countryIso}/${destination}/`
    }).catch(err => dispatch(applicationError(err))
  )
}

export const removeFromList = (countryIso, odpId) => dispatch => {
  axios.delete(`/api/odp/?odpId=${odpId}&countryIso=${countryIso}`)
    .then(() => {
      dispatch(fetchCountryOverviewStatus(countryIso))
      dispatch(fetchOdps(countryIso))
    }).catch(err => dispatch(applicationError(err))
  )
}

// Marking drafts

export const markAsActual = (countryIso, odp, history) => dispatch => {
  const validationStatus = validateDataPoint(odp)
  dispatch(validationCompleted(validationStatus))
  dispatch(markOdpDirty)

  if (validationStatus.valid) {
    dispatch(autosave.start)
    axios.post(`/api/odp/markAsActual/?odpId=${odp.odpId}&countryIso=${countryIso}`).then(resp => {
      dispatch(autosave.complete)
      dispatch({type: odpClearActiveAction})
      dispatch(fetchCountryOverviewStatus(countryIso))
      history.goBack()
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
  axios.get(`/api/prevOdp/${countryIso}/${odp.year}?countryIso=${countryIso}`).then(resp => {
    const prevOdp = resp.data
    if (prevOdp.nationalClasses) {
      dispatch(saveDraft(countryIso, copyNationalClassDefinitions(odp, prevOdp)))
    }
    else
      dispatch(applicationError({key: 'error.ndp.previousNdpNotFound', values: {year: odp.year}}))
  })
}

export const cancelDraft = (countryIso, odpId, destination) => dispatch => {
  if (odpId)
    axios.delete(`/api/odp/draft/?odpId=${odpId}&countryIso=${countryIso}`)
      .then(() => window.location = `/country/${countryIso}/${destination}/`)
      .catch((err) => dispatch(applicationError(err)))
  else
    window.location = `/country/${countryIso}/`
}
