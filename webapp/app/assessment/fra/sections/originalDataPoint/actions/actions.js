import axios from 'axios'
import * as R from 'ramda'

import { validateDataPoint } from '@common/validateOriginalDataPoint'
import * as FRA from '@common/assessment/fra'
import * as BasePaths from '@webapp/main/basePaths'
import { batchActions } from '@webapp/main/reduxBatch'
import { readPasteClipboard } from '@webapp/utils/copyPasteUtil'
import { acceptNextDecimal } from '@webapp/utils/numberInput'

import * as AppState from '@webapp/app/appState'
import { applicationError } from '@webapp/app/components/error/actions'
import * as autosave from '@webapp/app/components/autosave/actions'
import { fetchCountryOverviewStatus } from '@webapp/app/country/actions'

import * as OriginalDataPointState from '../originalDataPointState'
import * as ODP from '../originalDataPoint'
import handlePaste from '../paste'
import { getUpdateTablesWithOdp } from './updateSectionTables'

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
    const odp = ODP.addNationalClassPlaceHolder(data)
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
  const dispatched = async (dispatch, getState) => {
    const {
      data: { odpId },
    } = await axios.post(`/api/odp/draft/?countryIso=${countryIso}`, ODP.removeClassPlaceholder(odp))
    const state = getState()
    const actions = [autosave.complete, { type: odpSaveDraftCompleted, odpId }]

    // if original data point has just been created, the odpId must be added to odp state active object
    const isNew = !OriginalDataPointState.getActive(state).odpId
    if (isNew) {
      actions.push(...getUpdateTablesWithOdp(state, { ...odp, odpId }))
    }

    dispatch(batchActions(actions))
  }
  dispatched.meta = {
    debounce: {
      time: 500,
      key: odpSaveDraftStart,
    },
  }
  return dispatched
}

export const saveDraft = (countryIso, odp) => (dispatch, getState) => {
  if (!odp.year) {
    return
  }
  const actions = [{ type: odpSaveDraftStart, active: odp }, autosave.start]
  if (odp.validationStatus) actions.push(validationCompleted(validateDataPoint(odp)))

  // Update tables 1a and 1b
  actions.push(...getUpdateTablesWithOdp(getState(), odp))

  dispatch(batchActions(actions))
  dispatch(persistDraft(countryIso, odp))
}

export const cancelDraft = (countryIso, odpId, destination, history) => async () => {
  if (odpId) {
    // TODO on issue: https://github.com/openforis/fra-platform/issues/154
    // when canceling draft, delete request should respond with odp and then update tables with odp state
    await axios.delete(`/api/odp/draft/?odpId=${odpId}&countryIso=${countryIso}`)
    history.push(BasePaths.getAssessmentSectionLink(countryIso, FRA.type, destination))
  } else {
    history.push(BasePaths.getCountryHomeLink(countryIso))
  }
}

export const markAsActual = (countryIso, odp, history, destination) => async (dispatch, getState) => {
  const validationStatus = validateDataPoint(odp)
  const { valid } = validationStatus

  const actions = [validationCompleted(validationStatus)]
  if (valid) {
    actions.push(autosave.start)
    // Update tables 1a and 1b
    actions.push(...getUpdateTablesWithOdp(getState(), odp, false))
  }
  dispatch(batchActions(actions))

  if (valid) {
    await axios.post(`/api/odp/markAsActual/?odpId=${odp.odpId}&countryIso=${countryIso}`)
    dispatch(batchActions([autosave.complete, clearActive(), fetchCountryOverviewStatus(countryIso)]))
    history.push(BasePaths.getAssessmentSectionLink(countryIso, FRA.type, destination))
  }
}

export const copyPreviousNationalClasses = (countryIso, odp) => async (dispatch) => {
  const { data: prevOdp } = await axios.get(`/api/prevOdp/${countryIso}/${odp.year}?countryIso=${countryIso}`)
  if (prevOdp.nationalClasses) {
    dispatch(saveDraft(countryIso, ODP.copyNationalClassDefinitions(odp, prevOdp)))
  } else {
    dispatch(applicationError({ key: 'error.ndp.previousNdpNotFound', values: { year: odp.year } }))
  }
}

export const updateNationalClassValue = (index, fieldName, valueCurrent, valueUpdate) => (dispatch, getState) => {
  const state = getState()
  const odp = OriginalDataPointState.getActive(state)
  const countryIso = AppState.getCountryIso(state)
  const odpUpdate = ODP.updateNationalClass(odp, index, fieldName, acceptNextDecimal(valueUpdate, valueCurrent))
  dispatch(saveDraft(countryIso, odpUpdate))
}

// ====== Paste
export const pasteNationalClassValues = (props) => (dispatch, getState) => {
  const state = getState()
  const odp = OriginalDataPointState.getActive(state)
  const countryIso = AppState.getCountryIso(state)
  const { event, rowIndex, colIndex, columns, allowGrow = false, allowedClass = () => true } = props

  const rawPastedData = readPasteClipboard(event, 'string')
  const { updatedOdp } = handlePaste(columns, allowedClass, odp, allowGrow, rawPastedData, rowIndex, colIndex)
  dispatch(saveDraft(countryIso, updatedOdp))
}

// ====== Delete
export const remove = (countryIso, odpId, destination) => async (dispatch) => {
  // TODO on issue: https://github.com/openforis/fra-platform/issues/154
  // when deleting odp, update tables with odp state
  await axios.delete(`/api/odp/?odpId=${odpId}&countryIso=${countryIso}`)
  dispatch(batchActions([clearActive(), fetchCountryOverviewStatus(countryIso)]))
  window.location = BasePaths.getAssessmentSectionLink(countryIso, FRA.type, destination)
}

export const removeFromList = (countryIso, odpId) => async (dispatch) => {
  await axios.delete(`/api/odp/?odpId=${odpId}&countryIso=${countryIso}`)
  dispatch(batchActions([fetchCountryOverviewStatus(countryIso), fetchOdps(countryIso)]))
}
