const R = require('ramda')

const { assessmentStatus } = require('../assessment')

const keys = {
  status: 'status',
  type: 'type',
  deskStudy: 'deskStudy',
  locked: 'locked',
  canEditData: 'canEditData',
  canEditComments: 'canEditComments',
}

//====== READ
const getStatus = R.propOr('', keys.status)
const getType = R.prop(keys.type)
const getLocked = R.propOr(true, keys.locked)
const getDeskStudy = R.propEq(keys.deskStudy, true)
const getCanEditData = R.propEq(keys.canEditData, true)
const isStatusChanging = R.pipe(getStatus, R.equals(assessmentStatus.changing))

//====== UPDATE
const assocStatus = R.assoc(keys.status)
const assocDeskStudy = R.assoc(keys.deskStudy)

module.exports = {
  getStatus,
  getType,
  getLocked,
  getDeskStudy,
  getCanEditData,
  isStatusChanging,

  assocStatus,
  assocDeskStudy,
}
