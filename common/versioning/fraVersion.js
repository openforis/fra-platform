const R = require('ramda')

const status = {
  pending: 'pending',
  running: 'running',
  completed: 'completed',
  failed: 'failed',
}

const keys = {
  id: 'id',
  createdBy: 'createdBy',
  versionNumber: 'versionNumber',
  status: 'status',
  publishedAt: 'publishedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId',
  userName: 'userName',
  userEmail: 'userEmail',
}

const getId = R.prop(keys.id)
const getCreatedBy = R.prop(keys.createdBy)
const getVersionNumber = R.prop(keys.versionNumber)
const getStatus = R.prop(keys.status)
const getPublishedAt = R.prop(keys.publishedAt)
const getCreatedAt = R.prop(keys.createdAt)
const getUpdatedAt = R.prop(keys.updatedAt)
const getUserId = R.prop(keys.userId)
const getUserName = R.prop(keys.userName)
const getUserEmail = R.prop(keys.userEmail)

module.exports = {
  status,
  keys,
  getId,
  getCreatedBy,
  getVersionNumber,
  getStatus,
  getPublishedAt,
  getCreatedAt,
  getUpdatedAt,
  getUserId,
  getUserName,
  getUserEmail,
}
