const R = require('ramda')
const crypto = require('crypto')
const Promise = require('bluebird')

const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendErr} = require('../utils/requestUtils')

const {fetchCountryUsers} = require('../user/userRepository')
const {getChatSummary} = require('../userChat/userChatRepository')

const getUsersOverview = async (sessionUserId, dbUsers) => {

  const getUserOverview = async (user) => ({
    ...user,
    hash: crypto.createHash('md5').update(user.email).digest('hex'),
    chat: user.id !== sessionUserId
      ? await getChatSummary(user.id, sessionUserId)
      : null
  })

  const users = await Promise.all(dbUsers.map(getUserOverview))
  return users
}

module.exports.init = app => {

  app.get('/landing/:countryIso/overview', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const countryIso = req.params.countryIso
      const userId = req.user.id

      const dbUsers = await fetchCountryUsers(countryIso)
      const users = await getUsersOverview(userId, dbUsers)

      res.json({overview: {users}})
    } catch (err) {
      sendErr(res, err)
    }
  })

}
