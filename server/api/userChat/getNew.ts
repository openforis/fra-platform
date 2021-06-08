import { Express, Response, Request } from 'express'
import { checkCountryAccessFromReqParams } from '@server/utils/accessControl'
import * as db from '@server/db/db'
import { getChatUnreadMessages } from '@server/repository/userChat/userChatRepository'
import { sendErr } from '@server/utils/requestUtils'
import { ApiEndPoint } from '@common/api/endpoint'

export const UserChatGetNew = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.UserChat.getNew(), async (req: Request, res: Response) => {
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
