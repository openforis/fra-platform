// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'FRA'.
const FRA = require('./fra')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PanEuropea... Remove this comment to see the full error message
const PanEuropean = require('./panEuropean')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assessment... Remove this comment to see the full error message
const { assessmentStatus } = require('../assessment')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'keys'.
const keys = {
  status: 'status',
  type: 'type',
  deskStudy: 'deskStudy',
  canEditData: 'canEditData',
  canEditComments: 'canEditComments',
  tablesAccess: 'tablesAccess',
}

// ====== READ
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getStatus'... Remove this comment to see the full error message
const getStatus = R.propOr('', keys.status)
const getType = R.prop(keys.type)
const getDeskStudy = R.propEq(keys.deskStudy, true)
const getCanEditData = R.propEq(keys.canEditData, true)
const getTablesAccess = R.propOr([], keys.tablesAccess)
const isStatusChanging = R.pipe(getStatus, R.equals(assessmentStatus.changing))
// Type utils
const isTypePanEuropean = R.equals(PanEuropean.type)
const isTypeFRA = R.equals(FRA.type)

// ====== UPDATE
const assocStatus = R.assoc(keys.status)
const assocDeskStudy = R.assoc(keys.deskStudy)

module.exports = {
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
