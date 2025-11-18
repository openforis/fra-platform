import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const getInvitation = async (req: CountryRequest<{ invitationUuid: string }>, res: Response): Promise<void> => {
  try {
    const { invitationUuid } = req.query

    const invitation = await UserController.findByInvitation({ invitationUuid })

    Requests.sendOk(res, invitation)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
