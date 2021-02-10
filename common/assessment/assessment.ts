import * as R from 'ramda'
import FRA from './fra'
import PanEuropean from './panEuropean'
import { assessmentStatus } from '../assessment'

export const keys = {
  status: 'status',
  type: 'type',
  deskStudy: 'deskStudy',
  canEditData: 'canEditData',
  canEditComments: 'canEditComments',
  tablesAccess: 'tablesAccess',
}

// ====== READ
export const getStatus = R.propOr('', keys.status)
export const getType = R.prop(keys.type)
export const getDeskStudy = R.propEq(keys.deskStudy, true)
export const getCanEditData = R.propEq(keys.canEditData, true)
export const getTablesAccess = R.propOr([], keys.tablesAccess)
export const isStatusChanging = R.pipe(getStatus, R.equals(assessmentStatus.changing))
// Type utils
export const isTypePanEuropean = R.equals(PanEuropean.type)
export const isTypeFRA = R.equals(FRA.type)

// ====== UPDATE
export const assocStatus = R.assoc(keys.status)
export const assocDeskStudy = R.assoc(keys.deskStudy)

export default {
  keys,

  getStatus,
  getType,
  getDeskStudy,
  getCanEditData,
  getTablesAccess,
  isStatusChanging,
  isTypePanEuropean,
  isTypeFRA,

  assocStatus,
  assocDeskStudy,
}
