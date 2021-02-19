import * as R from 'ramda'

export const status: any = {
  pending: 'pending',
  running: 'running',
  completed: 'completed',
  failed: 'failed',
}
export const keys: any = {
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
export const getId = R.prop((keys as any).id)
export const getCreatedBy = R.prop((keys as any).createdBy)
export const getVersionNumber = (x: any) => R.prop((keys as any).versionNumber)(x)
export const getStatus = R.prop(keys.status)
export const getPublishedAt = (x: any) => R.prop((keys as any).publishedAt)(x)
export const getCreatedAt = R.prop((keys as any).createdAt)
export const getUpdatedAt = R.prop((keys as any).updatedAt)
export const getUserId = R.prop((keys as any).userId)
export const getUserName = R.prop((keys as any).userName)
export const getUserEmail = R.prop((keys as any).userEmail)
export default {
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
