// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Promise'.
const Promise = require('bluebird')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'checkCount... Remove this comment to see the full error message
const { checkCountryAccessFromReqParams } = require('../utils/accessControl')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const { sendErr } = require('../utils/requestUtils')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fetchCount... Remove this comment to see the full error message
const { fetchCountryUsers } = require('../user/userRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getChatSum... Remove this comment to see the full error message
const { getChatSummary } = require('../userChat/userChatRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fetchCount... Remove this comment to see the full error message
const { fetchCountryUnreadMessages } = require('../countryMessageBoard/countryMessageBoardRepository')

const getUsersOverview = async (sessionUserId: any, dbUsers: any) => {
  const getUserOverview = async (user: any) => ({
    ...user,

    chat: user.id !== sessionUserId ? await getChatSummary(user.id, sessionUserId) : null,
  })

  const users = await Promise.all(dbUsers.map(getUserOverview))
  return users
}

const sdgContactsFileName = 'NSO_SDG_Contact_Persons_20191230.xlsx'

module.exports.init = (app: any) => {
  app.get('/landing/:countryIso/overview', async (req: any, res: any) => {
    try {
      checkCountryAccessFromReqParams(req)

      const { countryIso } = req.params
      const userId = req.user.id

      const dbUsers = await fetchCountryUsers(countryIso)
      const users = await getUsersOverview(userId, dbUsers)
      const countryMessageBoardUnreadMessages = await db.transaction(fetchCountryUnreadMessages, [countryIso, userId])

      res.json({ overview: { users, countryMessageBoardUnreadMessages: countryMessageBoardUnreadMessages.length } })
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/landing/sdgFocalPoints', async (req: any, res: any) => {
    try {
      checkCountryAccessFromReqParams(req)

      const filePath = `${__dirname}/${sdgContactsFileName}`
      res.download(filePath, 'NSO_SDG_Contact_Persons.xlsx')
    } catch (err) {
      sendErr(res, err)
    }
  })
}
