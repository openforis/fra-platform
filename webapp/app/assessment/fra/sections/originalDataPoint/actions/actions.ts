import axios from 'axios'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { validateDataPoint } from '@common/validateOriginalDataPoint'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'
import * as BasePaths from '@webapp/main/basePaths'
import { batchActions } from '@webapp/main/reduxBatch'
import { readPasteClipboard } from '@webapp/utils/copyPasteUtil'
import { acceptNextDecimal } from '@webapp/utils/numberInput'

import * as AppState from '@webapp/store/app/state'
import { applicationError } from '@webapp/components/error/actions'
import * as autosave from '@webapp/app/components/autosave/actions'
import { fetchCountryOverviewStatus } from '@webapp/app/country/actions'

import * as OriginalDataPointState from '../originalDataPointState'
import * as ODP from '../originalDataPoint'
import handlePaste from '../paste'
import { getUpdateTablesWithOdp, getUpdateTablesWithNotOdp } from './updateSectionTables'

// ====== Validation
export const odpValidationCompleted = 'originalDataPoint/validationStatus/completed'
const validationCompleted = (validationStatus: any) => ({
  type: odpValidationCompleted,
  data: validationStatus,
})

// ====== clear active
export const odpClearActiveAction = 'originalDataPoint/clearActive'
export const clearActive = () => ({ type: odpClearActiveAction })

// ====== READ
export const odpFetchCompleted = 'originalDataPoint/fetch/completed'
export const odpListFetchCompleted = 'originalDataPointList/fetch/completed'

export const fetch = (odpId: any, countryIso: any) => async (dispatch: any) => {
  const { data } = await axios.get(`/api/odp/?${R.isNil(odpId) ? '' : `odpId=${odpId}&`}countryIso=${countryIso}`)
  if (R.isNil(odpId)) {
    dispatch(clearActive())
  } else {
    const odp = ODP.addNationalClassPlaceHolder(data)
    dispatch(batchActions([{ type: odpFetchCompleted, active: odp }, validationCompleted(validateDataPoint(odp))]))
  }
}

export const fetchOdps = (countryIso: any) => async (dispatch: any) => {
  const { data } = await axios.get(`/api/odps/${countryIso}`)
  dispatch({ type: odpListFetchCompleted, data })
}

// ====== UPDATE
export const odpSaveDraftStart = 'originalDataPoint/saveDraft/start'
export const odpSaveDraftCompleted = 'originalDataPoint/saveDraft/completed'

const persistDraft = (countryIso: any, odp: any) => {
  const dispatched = async (dispatch: any, getState: any) => {
    const {
      data: { odpId },
    } = await axios.post(`/api/odp/draft/?countryIso=${countryIso}`, ODP.removeClassPlaceholder(odp))
    const state = getState()
    const actions = [autosave.complete, { type: odpSaveDraftCompleted, odpId }]

    // if original data point has just been created, the odpId must be added to odp state active object
    const isNew = !OriginalDataPointState.getActive(state).odpId
    if (isNew) {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(dispatch: any) => void' is not ... Remove this comment to see the full error message
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

export const saveDraft = (countryIso: any, odp: any) => (dispatch: any, getState: any) => {
  if (!odp.year) {
    return
  }
  const actions = [{ type: odpSaveDraftStart, active: odp }, autosave.start]
  if (odp.validationStatus) actions.push(validationCompleted(validateDataPoint(odp)))

  // Update tables 1a and 1b
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(dispatch: any) => void' is not ... Remove this comment to see the full error message
  actions.push(...getUpdateTablesWithOdp(getState(), odp))

  dispatch(batchActions(actions))
  dispatch(persistDraft(countryIso, odp))
}

export const cancelDraft = (countryIso: any, odpId: any, destination: any, history: any) => async (
  dispatch: any,
  getState: any
) => {
  if (odpId) {
    const {
      data: { odp },
    } = await axios.delete(`/api/odp/draft/?odpId=${odpId}&countryIso=${countryIso}`)

    dispatch(batchActions(getUpdateTablesWithOdp(getState(), odp)))
    history.push(BasePaths.getAssessmentSectionLink(countryIso, FRA.type, destination))
  } else {
    history.push(BasePaths.getAssessmentHomeLink(countryIso, FRA.type))
  }
}

export const markAsActual = (countryIso: any, odp: any, history: any, destination: any) => async (
  dispatch: any,
  getState: any
) => {
  const validationStatus = validateDataPoint(odp)
  const { valid } = validationStatus

  const actions = [validationCompleted(validationStatus)]
  if (valid) {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ type: string; }' is not assign... Remove this comment to see the full error message
    actions.push(autosave.start)
    // Update tables 1a and 1b
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(dispatch: any) => void' is not ... Remove this comment to see the full error message
    actions.push(...getUpdateTablesWithOdp(getState(), odp, false))
  }
  dispatch(batchActions(actions))

  if (valid) {
    await axios.post(`/api/odp/markAsActual/?odpId=${odp.odpId}&countryIso=${countryIso}`)
    dispatch(batchActions([autosave.complete, clearActive(), fetchCountryOverviewStatus(countryIso)]))
    history.push(BasePaths.getAssessmentSectionLink(countryIso, FRA.type, destination))
  }
}

export const copyPreviousNationalClasses = (countryIso: any, odp: any) => async (dispatch: any) => {
  const { data: prevOdp } = await axios.get(`/api/prevOdp/${countryIso}/${odp.year}?countryIso=${countryIso}`)
  if (prevOdp.nationalClasses) {
    dispatch(saveDraft(countryIso, ODP.copyNationalClassDefinitions(odp, prevOdp)))
  } else {
    dispatch(applicationError({ key: 'error.ndp.previousNdpNotFound', values: { year: odp.year } }))
  }
}

export const updateNationalClassValue = (index: any, fieldName: any, valueCurrent: any, valueUpdate: any) => (
  dispatch: any,
  getState: any
) => {
  const state = getState()
  const odp = OriginalDataPointState.getActive(state)
  const countryIso = AppState.getCountryIso(state)
  const odpUpdate = ODP.updateNationalClass(odp, index, fieldName, acceptNextDecimal(valueUpdate, valueCurrent))
  dispatch(saveDraft(countryIso, odpUpdate))
}

// ====== Paste
export const pasteNationalClassValues = (props: any) => (dispatch: any, getState: any) => {
  const state = getState()
  const odp = OriginalDataPointState.getActive(state)
  const countryIso = AppState.getCountryIso(state)
  const { event, rowIndex, colIndex, columns, allowGrow = false, allowedClass = () => true } = props

  const rawPastedData = readPasteClipboard(event, 'string')
  const { updatedOdp } = handlePaste(columns, allowedClass, odp, allowGrow, rawPastedData, rowIndex, colIndex)
  dispatch(saveDraft(countryIso, updatedOdp))
}

// ====== Delete
export const remove = (countryIso: any, odp: any, destination: any, history: any) => async (
  dispatch: any,
  getState: any
) => {
  // If we delete ODP that has a FRA year,
  // get the corresponding FRA object and update state
  await axios.delete(`/api/odp/?odpId=${odp.odpId}&countryIso=${countryIso}`)

  const actions = [
    clearActive(),
    fetchCountryOverviewStatus(countryIso),
    ...getUpdateTablesWithNotOdp(getState(), Number(odp.year)),
  ]

  dispatch(batchActions(actions))
  history.push(BasePaths.getAssessmentSectionLink(countryIso, FRA.type, destination))
}

export const removeFromList = (countryIso: any, odpId: any) => async (dispatch: any) => {
  await axios.delete(`/api/odp/?odpId=${odpId}&countryIso=${countryIso}`)
  dispatch(batchActions([fetchCountryOverviewStatus(countryIso), fetchOdps(countryIso)]))
}
