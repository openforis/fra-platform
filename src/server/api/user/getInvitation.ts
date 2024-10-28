import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const getInvitation = async (req: CycleRequest<{ invitationUuid: string }>, res: Response) => {
  try {
    const { invitationUuid } = req.query

    const invitation = await UserController.findByInvitation({ invitationUuid })

    Requests.sendOk(res, invitation)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
