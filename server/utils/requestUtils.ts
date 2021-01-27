// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

const User = require('../../common/user/user')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'AccessCont... Remove this comment to see the full error message
const { AccessControlException } = require('./accessControl')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'appUri'.
const appUri = process.env.APP_URI ? process.env.APP_URI : ''

/* Response Utils */

// Response helper functions
// Sends an empty JSON message with status 200
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendOk'.
const sendOk = (res: any) => res.json({})
const send404 = (res: any) => res.status(404).send('404 / Page not found')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const sendErr = (res: any, err: any) => {
  console.error(err)
  if (err instanceof AccessControlException) {
    res.status(403).json({ error: err.error })
  } else {
    res.status(500).json({ error: 'Could not serve', err })
  }
}

/* Request Utils  */
const methods = {
  GET: 'GET',
}

const getMethod = (req: any) => R.prop('method', req)
const isGet = (req: any) => getMethod(req) === methods.GET

const getParams = (req: any) =>
  R.pipe(
    R.mergeLeft(R.prop('query', req)),
    R.mergeLeft(R.prop('params', req)),
    R.mergeLeft(R.prop('body', req)),
    // Convert String boolean values to Boolean type
    R.mapObjIndexed((val: any) =>
      R.ifElse((v: any) => v === 'true' || v === 'false', R.always(val === 'true'), R.identity)(val)
    )
  )({})

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'serverUrl'... Remove this comment to see the full error message
const serverUrl = (req: any) => (R.isEmpty(appUri) ? `${req.protocol}://${req.get('host')}` : appUri)

// User helper functions
const getUser = R.prop('user')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getUserId'... Remove this comment to see the full error message
const getUserId = R.pipe(getUser, User.getId)
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getUserNam... Remove this comment to see the full error message
const getUserName = R.pipe(getUser, User.getName)
const getUserRoles = R.pipe(getUser, User.getRoles)

module.exports = {
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
