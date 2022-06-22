import { Request, Response } from 'express'

import { UserController } from '@server/controller/user'
import { Requests } from '@server/utils'

export const removeInvitation = async (req: Request, res: Response) => {
  try {
    const { invitationUuid } = req.query as { invitationUuid: string }

    const userRole = await UserController.removeInvitation({ invitationUuid })

    Requests.sendOk(res, userRole)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
