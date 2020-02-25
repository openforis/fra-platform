const R = require('ramda')
const { AccessControlException } = require('./accessControl')

const appUri = process.env.APP_URI ? process.env.APP_URI : ''

/* Response Utils */

// Response helper functions
// Sends an empty JSON message with status 200
const sendOk = res => res.json({})
const send404 = res => res.status(404).send('404 / Page not found')
const sendErr = (res, err) => {
  console.error(err)
  if (err instanceof AccessControlException) {
    res.status(403).json({ error: err.error })
  } else {
    res.status(500).json({ error: 'Could not serve', err })
  }
}

/* Request Utils  */

// User helper functions
const getUser = R.prop('user')
const getUserId = R.pipe(getUser, R.prop('id'))
const getUserName = R.pipe(getUser, R.prop('name'))

const getParams = req =>
  R.pipe(
    R.mergeLeft(R.prop('query', req)),
    R.mergeLeft(R.prop('params', req)),
    R.mergeLeft(R.prop('body', req)),
    // Convert String boolean values to Boolean type
    R.mapObjIndexed(val => R.ifElse(v => v === 'true' || v === 'false', R.always(val === 'true'), R.identity)(val)),
  )({})

const serverUrl = req => R.isEmpty(appUri)
  ? req.protocol + '://' + req.get('host')
  : appUri

module.exports = {
  appUri,
  getUser,
  getUserId,
  getUserName,
  getParams,
  send404,
  sendErr,
  sendOk,
  serverUrl,
}
