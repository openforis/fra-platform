const R = require('ramda')
const {AccessControlException} = require('./accessControl')

const sendErr = (res, err) => {
  console.error(err)
  if (err instanceof AccessControlException) {
    res.status(403).json({error: err.error})
  } else {
    res.status(500).json({error: 'Could not serve', err})
  }
}

// Return request user
const getUser = R.prop('user')
const getUserId = R.pipe(getUser, R.prop('id'))
const getUserName = R.pipe(getUser, R.prop('name'))

// Sends an empty JSON message with status 200
const sendOk = res => res.json({})

const send404 = res => res.status(404).send('404 / Page not found')

const appUri = process.env.APP_URI ? process.env.APP_URI : ''

const serverUrl = req => R.isEmpty(appUri)
  ? req.protocol + '://' + req.get('host')
  : appUri

module.exports = {
  sendErr,
  sendOk,
  send404,
  serverUrl,
  appUri,
  getUser,
  getUserId,
  getUserName,
}
