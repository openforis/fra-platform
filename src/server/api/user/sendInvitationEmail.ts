import { Response } from 'express'

import { CycleRequest } from '@meta/api/request'

import { UserController } from '@server/controller/user'
import { Requests } from '@server/utils'

export const sendInvitationEmail = async (
  req: CycleRequest<{
    invitationUuid: string
  }>,
  res: Response
) => {
  try {
    const { invitationUuid } = req.query

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
