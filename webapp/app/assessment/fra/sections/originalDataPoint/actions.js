import axios from 'axios'
import * as R from 'ramda'

import * as FRA from '@common/assessment/fra'
import * as BasePaths from '@webapp/main/basePaths'
import { batchActions } from '@webapp/main/reduxBatch'

import { applicationError } from '@webapp/app/components/error/actions'
import * as autosave from '@webapp/app/components/autosave/actions'
import { validateDataPoint } from '@common/validateOriginalDataPoint'
import { fetchCountryOverviewStatus } from '@webapp/app/country/actions'

import { removeClassPlaceholder, addNationalClassPlaceHolder, copyNationalClassDefinitions } from './originalDataPoint'
import { markOdpDirty } from '../../components/tableWithOdp/actions'

// ====== Validation
export const odpValidationCompleted = 'originalDataPoint/validationStatus/completed'
const validationCompleted = (validationStatus) => ({ type: odpValidationCompleted, data: validationStatus })

// ====== clear active
export const odpClearActiveAction = 'originalDataPoint/clearActive'
export const clearActive = () => ({ type: odpClearActiveAction })

// ====== READ
export const odpFetchCompleted = 'originalDataPoint/fetch/completed'
export const odpListFetchCompleted = 'originalDataPointList/fetch/completed'

export const fetch = (odpId, countryIso) => async (dispatch) => {
  const { data } = await axios.get(`/api/odp/?${R.isNil(odpId) ? '' : `odpId=${odpId}&`}countryIso=${countryIso}`)
  if (R.isNil(odpId)) {
    dispatch(clearActive())
  } else {
    const odp = addNationalClassPlaceHolder(data)
    dispatch(batchActions([{ type: odpFetchCompleted, active: odp }, validationCompleted(validateDataPoint(odp))]))
  }
}

export const fetchOdps = (countryIso) => async (dispatch) => {
  const { data } = await axios.get(`/api/odps/${countryIso}`)
  dispatch({ type: odpListFetchCompleted, data })
}

// ====== UPDATE
export const odpSaveDraftStart = 'originalDataPoint/saveDraft/start'
export const odpSaveDraftCompleted = 'originalDataPoint/saveDraft/completed'

const persistDraft = (countryIso, odp) => {
  const dispatched = async (dispatch) => {
    const {
      data: { odpId },
    } = await axios.post(`/api/odp/draft/?countryIso=${countryIso}`, removeClassPlaceholder(odp))
    dispatch(batchActions([autosave.complete, { type: odpSaveDraftCompleted, odpId }]))
  }
  dispatched.meta = {
    debounce: {
      time: 500,
      key: odpSaveDraftStart,
    },
  }
  return dispatched
}

export const saveDraft = (countryIso, obj) => (dispatch) => {
  if (!obj.year) {
    return
  }
  const actions = [{ type: odpSaveDraftStart, active: obj }, autosave.start]
  if (obj.validationStatus) actions.push(validationCompleted(validateDataPoint(obj)))
  dispatch(batchActions(actions))

  dispatch(persistDraft(countryIso, obj))
}

export const cancelDraft = (countryIso, odpId, destination) => async () => {
  if (odpId) {
    await axios.delete(`/api/odp/draft/?odpId=${odpId}&countryIso=${countryIso}`)
    window.location = BasePaths.getAssessmentSectionLink(countryIso, FRA.type, destination)
  } else {
    window.location = BasePaths.getCountryHomeLink(countryIso)
  }
}

export const copyPreviousNationalClasses = (countryIso, odp) => async (dispatch) => {
  const { data: prevOdp } = await axios.get(`/api/prevOdp/${countryIso}/${odp.year}?countryIso=${countryIso}`)
  if (prevOdp.nationalClasses) {
    dispatch(saveDraft(countryIso, copyNationalClassDefinitions(odp, prevOdp)))
  } else {
    dispatch(applicationError({ key: 'error.ndp.previousNdpNotFound', values: { year: odp.year } }))
  }
}

export const markAsActual = (countryIso, odp, history) => async (dispatch) => {
  const validationStatus = validateDataPoint(odp)
  const { valid } = validationStatus

  const actions = [validationCompleted(validationStatus), markOdpDirty]
  if (valid) actions.push(autosave.start)
  dispatch(batchActions(actions))

  if (valid) {
    await axios.post(`/api/odp/markAsActual/?odpId=${odp.odpId}&countryIso=${countryIso}`)
    dispatch(batchActions(autosave.complete, clearActive(), fetchCountryOverviewStatus(countryIso)))
    history.goBack()
  }
}

// ====== Delete
export const remove = (countryIso, odpId, destination) => async (dispatch) => {
  await axios.delete(`/api/odp/?odpId=${odpId}&countryIso=${countryIso}`)
  dispatch(batchActions([{ type: odpClearActiveAction }, fetchCountryOverviewStatus(countryIso)]))
  window.location = BasePaths.getAssessmentSectionLink(countryIso, FRA.type, destination)
}

export const removeFromList = (countryIso, odpId) => async (dispatch) => {
  await axios.delete(`/api/odp/?odpId=${odpId}&countryIso=${countryIso}`)
  dispatch(batchActions([fetchCountryOverviewStatus(countryIso), fetchOdps(countryIso)]))
}
