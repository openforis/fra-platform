import { Express, Response, Request } from 'express'
import { checkCountryAccessFromReqParams } from '@server/utils/accessControl'
import * as db from '@server/db/db'
import { getChatMessages } from '@server/repository/userChat/userChatRepository'
import { sendErr } from '@server/utils/requestUtils'

export const UserChatGetAll = {
  init: (express: Express): void => {
    express.get('/api/userChat/:countryIso/messages/all', async (req: Request, res: Response) => {
      try {
        checkCountryAccessFromReqParams(req)

        const messages = await db.transaction(getChatMessages, [req.query.sessionUserId, req.query.otherUserId])

        res.json(messages)
      } catch (e) {
        sendErr(res, e)
      }
    })
  },
}
