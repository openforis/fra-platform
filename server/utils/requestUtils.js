const {AccessControlException} = require('./accessControl')

module.exports.sendErr = (res, err) => {
  console.error(err)
  if (err instanceof AccessControlException) {
    res.status(403).json({error: err.error})
  } else {
    res.status(500).json({error: 'Could not serve', err})
  }
}
