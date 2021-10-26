import axios from 'axios'

import { FRA } from '@core/assessment'
import { ODP } from '@core/odp'
import { validateDataPoint } from '@common/validateOriginalDataPoint'
import * as BasePaths from '@webapp/main/basePaths'
import { batchActions } from '@webapp/store'
import { readPasteClipboard } from '@webapp/utils/copyPasteUtil'
import { acceptNextDecimal } from '@webapp/utils/numberInput'

import { applicationError } from '@webapp/components/error/actions'

import { ApiEndPoint } from '@common/api/endpoint'
import { CountryActions } from '@webapp/store/country'
import { AutosaveActions } from '@webapp/store/autosave'
import { OriginalDataPointActions } from '@webapp/store/page/originalDataPoint'
import * as ODPs from '../originalDataPoint'
import handlePaste from '../paste'
import { getUpdateTablesWithNotOdp, getUpdateTablesWithOdp } from './updateSectionTables'

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

export const fetchOdps = (countryIso: any) => async (dispatch: any) => {
  const { data } = await axios.get(ApiEndPoint.Odp.get(countryIso))
  dispatch({ type: odpListFetchCompleted, data })
}

// ====== UPDATE
export const odpSaveDraftStart = 'originalDataPoint/persistDraft/start'
export const odpSaveDraftCompleted = 'originalDataPoint/persistDraft/completed'

export const cancelDraft =
  (countryIso: any, odpId: any, destination: any, history: any) => async (dispatch: any, getState: any) => {
    if (odpId) {
      const {
        data: { odp },
      } = await axios.delete(`${ApiEndPoint.Odp.deleteDraft()}?odpId=${odpId}&countryIso=${countryIso}`)

      dispatch(batchActions(getUpdateTablesWithOdp(getState(), odp)))
      history.push(BasePaths.getAssessmentSectionLink(countryIso, FRA.type, destination))
    } else {
      history.push(BasePaths.getAssessmentHomeLink(countryIso, FRA.type))
    }
  }

export const markAsActual =
  (countryIso: any, odp: any, history: any, destination: any) => async (dispatch: any, getState: any) => {
    const validationStatus = validateDataPoint(odp)
    const { valid } = validationStatus

    const actions: any[] = [validationCompleted(validationStatus)]
    if (valid) {
      dispatch(AutosaveActions.autoSaveStart())
      // Update tables 1a and 1b
      actions.push(...getUpdateTablesWithOdp(getState(), odp, false))
    }
    dispatch(batchActions(actions))

    if (valid) {
      await axios.post(`${ApiEndPoint.Odp.markAsActual()}?odpId=${odp.odpId}&countryIso=${countryIso}`)
      dispatch(AutosaveActions.autoSaveComplete())
      dispatch(batchActions([clearActive(), CountryActions.fetchCountryStatus(countryIso)]))
      history.push(BasePaths.getAssessmentSectionLink(countryIso, FRA.type, destination))
    }
  }

export const copyPreviousNationalClasses = (countryIso: string, odp: ODP) => async (dispatch: any) => {
  const { data: prevOdp } = await axios.get(
    `${ApiEndPoint.Odp.getPrevious(countryIso, odp.year)}?countryIso=${countryIso}`
  )
  if (prevOdp.nationalClasses) {
    dispatch(OriginalDataPointActions.updateODP({ odp: ODPs.copyNationalClassDefinitions(odp, prevOdp) }))
  } else {
    dispatch(applicationError({ key: 'error.ndp.previousNdpNotFound', values: { year: odp.year } }))
  }
}

export const updateNationalClassValue =
  (index: any, fieldName: any, valueCurrent: any, valueUpdate: any) => (dispatch: any, getState: any) => {
    const state = getState()
    const { odp } = state.page.originalDataPoint
    const odpUpdate = ODPs.updateNationalClass(odp, index, fieldName, acceptNextDecimal(valueUpdate, valueCurrent))
    dispatch(OriginalDataPointActions.updateODP({ odp: odpUpdate }))
  }

// ====== Paste
export const pasteNationalClassValues = (props: any) => (dispatch: any, getState: any) => {
  const state = getState()
  const { odp } = state.page.originalDataPoint
  const { event, rowIndex, colIndex, columns, allowGrow = false, allowedClass = () => true } = props

  const rawPastedData = readPasteClipboard(event, 'string')
  const { updatedOdp } = handlePaste(columns, allowedClass, odp, allowGrow, rawPastedData, rowIndex, colIndex)
  dispatch(OriginalDataPointActions.updateODP({ odp: updatedOdp }))
}

// ====== Delete
export const remove =
  (countryIso: any, odp: any, destination: any, history: any) => async (dispatch: any, getState: any) => {
    // If we delete ODP that has a FRA year,
    // get the corresponding FRA object and update state
    await axios.delete(`${ApiEndPoint.Odp.delete()}?odpId=${odp.odpId}&countryIso=${countryIso}`)

    const actions = [
      clearActive(),
      CountryActions.fetchCountryStatus(countryIso),
      ...getUpdateTablesWithNotOdp(getState(), Number(odp.year)),
    ]

    dispatch(batchActions(actions))
    history.push(BasePaths.getAssessmentSectionLink(countryIso, FRA.type, destination))
  }

export const removeFromList = (countryIso: any, odpId: any) => async (dispatch: any) => {
  await axios.delete(`${ApiEndPoint.Odp.delete()}?odpId=${odpId}&countryIso=${countryIso}`)
  dispatch(batchActions([CountryActions.fetchCountryStatus(countryIso), fetchOdps(countryIso)]))
}
