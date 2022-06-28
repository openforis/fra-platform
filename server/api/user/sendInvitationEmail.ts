import { Request, Response } from 'express'

import { UserController } from '@server/controller/user'
import { Requests } from '@server/utils'

export const sendInvitationEmail = async (req: Request, res: Response) => {
  try {
    const { invitationUuid } = req.query as { invitationUuid: string }

    const user = Requests.getRequestUser(req)

    await UserController.sendInvitationEmail({
      invitationUuid,
      user,
    })

    Requests.sendOk(res, null)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
