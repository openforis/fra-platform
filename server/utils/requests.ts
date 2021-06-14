import * as R from 'ramda'

import * as User from '../../common/user/user'

import { AccessControlException } from './accessControl'

export const appUri = process.env.APP_URI ? process.env.APP_URI : ''

/* Response Utils */

// Response helper functions
// Sends an empty JSON message with status 200
export const sendOk = (res: any) => res.json({})
export const send404 = (res: any) => res.status(404).send('404 / Page not found')
export const sendErr = (res: any, err?: any) => {
  console.error(err)
  if (err instanceof AccessControlException) {
    // @ts-ignore
    res.status(403).json({ error: err.error })
  } else {
    res.status(500).json({ error: 'Could not serve', err })
  }
}

/* Request Utils  */
export const methods = {
  GET: 'GET',
}

export const getMethod = (req: any) => R.prop('method', req)
export const isGet = (req: any) => getMethod(req) === methods.GET

export const getParams = (req: any) =>
  R.pipe(
    R.mergeLeft(R.prop('query', req)),
    R.mergeLeft(R.prop('params', req)),
    R.mergeLeft(R.prop('body', req)),
    // Convert String boolean values to Boolean type
    R.mapObjIndexed((val: any) =>
      R.ifElse((v: any) => v === 'true' || v === 'false', R.always(val === 'true'), R.identity)(val)
    )
  )({})

export const serverUrl = (req: any) => (R.isEmpty(appUri) ? `${req.protocol}://${req.get('host')}` : appUri)

// User helper functions
export const getUser = R.prop('user')
// @ts-ignore
export const getUserId = (req) => R.pipe(getUser, User.getId)(req)
// @ts-ignore
export const getUserName = R.pipe(getUser, User.getName)
export const getUserRoles = R.pipe(getUser, User.getRoles)

export const Requests = {
  appUri,

  isGet,
  getMethod,
  getParams,
  send404,
  sendErr,
  sendOk,
  serverUrl,

  // User
  getUser,
  getUserId,
  getUserName,
  getUserRoles,
}

export default Requests
