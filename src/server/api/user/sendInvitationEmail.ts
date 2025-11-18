import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const sendInvitationEmail = async (
  req: CountryRequest<{ invitationUuid: string }>,
  res: Response
): Promise<void> => {
  try {
    const { invitationUuid } = req.query

    const userRole = await UserController.sendInvitationEmail({ invitationUuid })

    Requests.sendOk(res, userRole)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
