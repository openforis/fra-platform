const R = require('ramda')
const FRA = require('./fra')
const PanEuropean = require('./panEuropean')
const { assessmentStatus } = require('../assessment')

const keys = {
  status: 'status',
  type: 'type',
  deskStudy: 'deskStudy',
  canEditData: 'canEditData',
  canEditComments: 'canEditComments',
  tablesAccess: 'tablesAccess',
}

// ====== READ
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
