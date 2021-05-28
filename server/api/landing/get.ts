import { Express, Response, Request } from 'express'
import * as db from '../../db/db'

import { checkCountryAccessFromReqParams } from '../../utils/accessControl'
import { sendErr } from '../../utils/requestUtils'

import { fetchCountryUsers } from '../../user/userRepository'
import { getChatSummary } from '../../userChat/userChatRepository'
import { fetchCountryUnreadMessages } from '../../countryMessageBoard/countryMessageBoardRepository'

const getUsersOverview = async (sessionUserId: any, dbUsers: any) => {
  const getUserOverview = async (user: any) => ({
    ...user,

    chat: user.id !== sessionUserId ? await getChatSummary(user.id, sessionUserId) : null,
  })

  const users = await Promise.all(dbUsers.map(getUserOverview))
  return users
}

const sdgContactsFileName = 'NSO_SDG_Contact_Persons_20191230.xlsx'

export const LandingGet = {
  init: (express: Express): void => {
    express.get('/api/landing/:countryIso/overview', async (req: Request, res: Response) => {
      try {
        checkCountryAccessFromReqParams(req)

        const { countryIso } = req.params
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const userId = req.user.id

        const dbUsers = await fetchCountryUsers(countryIso)
        const users = await getUsersOverview(userId, dbUsers)
        const countryMessageBoardUnreadMessages = await db.transaction(fetchCountryUnreadMessages, [countryIso, userId])

        res.json({ overview: { users, countryMessageBoardUnreadMessages: countryMessageBoardUnreadMessages.length } })
      } catch (err) {
        sendErr(res, err)
      }
    })

    express.get('/api/landing/sdgFocalPoints', async (req: Request, res: Response) => {
      try {
        checkCountryAccessFromReqParams(req)

        const filePath = `${__dirname}/../../static/landing/${sdgContactsFileName}`
        res.download(filePath, 'NSO_SDG_Contact_Persons.xlsx')
      } catch (err) {
        sendErr(res, err)
      }
    })
  },
}
