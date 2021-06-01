import { Express, Response, Request } from 'express'
import { checkCountryAccessFromReqParams } from '@server/utils/accessControl'
import * as db from '@server/db/db'
import { getChatUnreadMessages } from '@server/repository/userChat/userChatRepository'
import { sendErr } from '@server/utils/requestUtils'
import { EndPoint } from '@server/api/endpoint'

export const UserChatGetNew = {
  init: (express: Express): void => {
    express.get(EndPoint.UserChat.getNew, async (req: Request, res: Response) => {
      try {
        checkCountryAccessFromReqParams(req)

        const messages = await db.transaction(getChatUnreadMessages, [
          req.query.otherUserId,
          req.query.sessionUserId,
          true,
        ])

        res.json(messages)
      } catch (e) {
        sendErr(res, e)
      }
    })
  },
}
