import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { MessageCenterController } from 'server/controller/messageCenter'
import Requests from 'server/utils/requests'

export const getUnreadMessages = async (req: CountryRequest<{ key: string }>, res: Response): Promise<void> => {
  try {
    const { countryIso, key } = req.query
    const user = Requests.getUser(req)

    const { assessment, cycle } = req.context

    const { unreadMessages } = await MessageCenterController.getUnreadMessages({
      countryIso,
      assessment,
      cycle,
      key,
      user,
    })

    Requests.sendOk(res, unreadMessages)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
