import * as db from '../db/db'

import { checkCountryAccessFromReqParams } from '../utils/accessControl'
import { sendErr } from '../utils/requestUtils'

import { fetchCountryUsers } from '../user/userRepository'
import { getChatSummary } from '../userChat/userChatRepository'
import { fetchCountryUnreadMessages } from '../countryMessageBoard/countryMessageBoardRepository'

const getUsersOverview = async (sessionUserId: any, dbUsers: any) => {
  const getUserOverview = async (user: any) => ({
    ...user,

    chat: user.id !== sessionUserId ? await getChatSummary(user.id, sessionUserId) : null,
  })

  const users = await Promise.all(dbUsers.map(getUserOverview))
  return users
}

const sdgContactsFileName = 'NSO_SDG_Contact_Persons_20191230.xlsx'

export const init = (app: any) => {
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

      const filePath = `${__dirname}/../static/landing/${sdgContactsFileName}`
      res.download(filePath, 'NSO_SDG_Contact_Persons.xlsx')
    } catch (err) {
      sendErr(res, err)
    }
  })
}
