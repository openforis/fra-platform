const Promise = require('bluebird')
const db = require('../db/db')

const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendErr} = require('../utils/requestUtils')

const {fetchCountryUsers} = require('../user/userRepository')
const {getChatSummary} = require('../userChat/userChatRepository')
const {fetchCountryUnreadMessages} = require('../countryMessageBoard/countryMessageBoardRepository')

const getUsersOverview = async (sessionUserId, dbUsers) => {

  const getUserOverview = async (user) => ({
    ...user,
    chat: user.id !== sessionUserId
      ? await getChatSummary(user.id, sessionUserId)
      : null
  })

  const users = await Promise.all(dbUsers.map(getUserOverview))
  return users
}

const sdgContactsFileName = 'NSO_SDG_Contact_Persons_20191230.xlsx'

module.exports.init = app => {

  app.get('/landing/:countryIso/overview', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const countryIso = req.params.countryIso
      const userId = req.user.id

      const dbUsers = await fetchCountryUsers(countryIso)
      const users = await getUsersOverview(userId, dbUsers)
      const countryMessageBoardUnreadMessages = await db.transaction(fetchCountryUnreadMessages, [countryIso, userId])

      res.json({overview: {users, countryMessageBoardUnreadMessages: countryMessageBoardUnreadMessages.length}})
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/landing/sdgFocalPoints', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const filePath = `${__dirname}/${sdgContactsFileName}`
      res.download(filePath, 'NSO_SDG_Contact_Persons.xlsx')

    } catch (err) {
      sendErr(res, err)
    }
  })

}
