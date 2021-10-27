import axios from 'axios'

import { FRA } from '@core/assessment'
import { ODP } from '@core/odp'
import * as BasePaths from '@webapp/main/basePaths'
import { batchActions } from '@webapp/store'

import { applicationError } from '@webapp/components/error/actions'

import { ApiEndPoint } from '@common/api/endpoint'
import { CountryActions } from '@webapp/store/country'
import { OriginalDataPointActions } from '@webapp/store/page/originalDataPoint'
import * as ODPs from '../originalDataPoint'
import { getUpdateTablesWithNotOdp } from './updateSectionTables'

// ====== Validation
export const odpValidationCompleted = 'originalDataPoint/validationStatus/completed'

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
