const R = require('ramda')

const keys = {
  status: 'status',
  type: 'type',
  deskStudy: 'deskStudy',
  locked: 'locked',
  canEditData: 'canEditData',
  canEditComments: 'canEditComments',
}

const getStatus = R.propOr('', keys.status)
const getType = R.prop(keys.type)
const getLocked = R.propOr(true, keys.locked)
const getCanEditData = R.propEq(keys.canEditData, true)

module.exports = {
  getStatus,
  getType,
  getLocked,
  getCanEditData,
}
