const {AccessControlException} = require('./accessControl')

const sendErr = (res, err) => {
  console.error(err)
  if (err instanceof AccessControlException) {
    res.status(403).json({error: err.error})
  } else {
    res.status(500).json({error: 'Could not serve', err})
  }
}

// Sends an empty JSON message with status 200
const sendOk = res => res.json({})

const send404 = res => res.status(404).send('404 / Page not found')

const serverUrl = req => req.protocol + '://' + req.get('host')

module.exports = {
  sendErr,
  sendOk,
  send404,
  serverUrl
}
