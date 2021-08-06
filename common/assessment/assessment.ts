import * as R from 'ramda'
import { FRA, PanEuropean } from '@core/assessment'
import { assessmentStatus } from '../assessment'

/**
 * @deprecated
 */
export const keys = {
  status: 'status',
  type: 'type',
  deskStudy: 'deskStudy',
  canEditData: 'canEditData',
  canEditComments: 'canEditComments',
  tablesAccess: 'tablesAccess',
}

// ====== READ
/**
 * @deprecated
 */
export const getStatus = R.propOr('', keys.status)
/**
 * @deprecated
 */
export const getType = R.prop(keys.type)
/**
 * @deprecated
 */
export const getDeskStudy = R.propEq(keys.deskStudy, true)
/**
 * @deprecated
 */
export const getCanEditData = R.propEq(keys.canEditData, true)
/**
 * @deprecated
 */
export const getTablesAccess = R.propOr([], keys.tablesAccess)
/**
 * @deprecated
 */
export const isStatusChanging = R.pipe(getStatus, R.equals(assessmentStatus.changing))
// Type utils
/**
 * @deprecated
 */
export const isTypePanEuropean = R.equals(PanEuropean.type)
/**
 * @deprecated
 */
export const isTypeFRA = R.equals(FRA.type)

// ====== UPDATE
/**
 * @deprecated
 */
export const assocStatus = R.assoc(keys.status)
/**
 * @deprecated
 */
export const assocDeskStudy = R.assoc(keys.deskStudy)

/**
 * @deprecated
 */
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
