import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const sendInvitationEmail = async (req: CycleRequest<{ invitationUuid: string }>, res: Response) => {
  try {
    const { invitationUuid } = req.query

    const userRole = await UserController.sendInvitationEmail({ invitationUuid })

    Requests.sendOk(res, userRole)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
