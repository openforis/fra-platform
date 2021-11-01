import axios from 'axios'

import { ODP } from '@core/odp'

import { applicationError } from '@webapp/components/error/actions'

import { ApiEndPoint } from '@common/api/endpoint'
import { OriginalDataPointActions } from '@webapp/store/page/originalDataPoint'
import * as ODPs from '../originalDataPoint'

// ====== Validation
export const odpValidationCompleted = 'originalDataPoint/validationStatus/completed'

// ====== clear active
export const odpClearActiveAction = 'originalDataPoint/clearActive'

// ====== READ
export const odpFetchCompleted = 'originalDataPoint/fetch/completed'
export const odpListFetchCompleted = 'originalDataPointList/fetch/completed'

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
