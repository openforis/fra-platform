import { exportReducer } from '@webapp/utils/reduxUtils'

import * as ODP from './originalDataPoint'
import * as OriginalDataPointState from './originalDataPointState'
import {
  odpClearActiveAction,
  odpFetchCompleted,
  odpListFetchCompleted,
  odpSaveDraftCompleted,
  odpSaveDraftStart,
  odpValidationCompleted,
} from './actions'

const actionHandlers = {
  [odpSaveDraftStart]: (state, { active }) => OriginalDataPointState.assocActive(active)(state),
  [odpSaveDraftCompleted]: (state, { odpId }) => OriginalDataPointState.assocActiveId(Number(odpId))(state),
  [odpValidationCompleted]: (state, { data }) => OriginalDataPointState.assocActiveValidation(data)(state),

  [odpFetchCompleted]: (state, { active }) => OriginalDataPointState.assocActive(active)(state),
  [odpListFetchCompleted]: (state, { data }) => OriginalDataPointState.assocOdps(data)(state),

  [odpClearActiveAction]: (state) => OriginalDataPointState.assocActive(ODP.emptyDataPoint())(state),
}

export default exportReducer(actionHandlers)
