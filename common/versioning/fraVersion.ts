// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'status'.
const status = {
  pending: 'pending',
  running: 'running',
  completed: 'completed',
  failed: 'failed',
}
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'keys'.
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
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getId'.
const getId = R.prop((keys as any).id)
const getCreatedBy = R.prop((keys as any).createdBy)
const getVersionNumber = R.prop((keys as any).versionNumber)
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getStatus'... Remove this comment to see the full error message
const getStatus = R.prop(keys.status)
const getPublishedAt = R.prop((keys as any).publishedAt)
const getCreatedAt = R.prop((keys as any).createdAt)
const getUpdatedAt = R.prop((keys as any).updatedAt)
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getUserId'... Remove this comment to see the full error message
const getUserId = R.prop((keys as any).userId)
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getUserNam... Remove this comment to see the full error message
const getUserName = R.prop((keys as any).userName)
const getUserEmail = R.prop((keys as any).userEmail)
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
