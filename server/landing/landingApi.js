const R = require('ramda')
const crypto = require('crypto')

const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendErr} = require('../utils/requestUtils')

const {fetchCountryUsers} = require('../user/userRepository')

module.exports.init = app => {

  app.get('/landing/:countryIso/overview', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const countryIso = req.params.countryIso

      const dbUsers = await fetchCountryUsers(countryIso)
      const users = dbUsers.map(user => ({
        ...user,
        hash: crypto.createHash('md5').update(user.email).digest('hex')
      }))

      res.json({overview: {users}})
    } catch (err) {
      sendErr(res, err)
    }
  })

}
