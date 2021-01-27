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
  [odpSaveDraftStart]: (state: any, { active }: any) => OriginalDataPointState.assocActive(active)(state),
  [odpSaveDraftCompleted]: (state: any, { odpId }: any) => OriginalDataPointState.assocActiveId(Number(odpId))(state),
  [odpValidationCompleted]: (state: any, { data }: any) => OriginalDataPointState.assocActiveValidation(data)(state),

  [odpFetchCompleted]: (state: any, { active }: any) => OriginalDataPointState.assocActive(active)(state),
  [odpListFetchCompleted]: (state: any, { data }: any) => OriginalDataPointState.assocOdps(data)(state),

  [odpClearActiveAction]: (state: any) => OriginalDataPointState.assocActive(ODP.emptyDataPoint())(state),
}

export default exportReducer(actionHandlers)
