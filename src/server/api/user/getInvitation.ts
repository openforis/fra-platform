import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const getInvitation = async (req: CycleRequest<{ invitationUuid: string }>, res: Response) => {
  try {
    const { invitationUuid } = req.query

    const { userRole, assessment, user, userProviders } = await UserController.findByInvitation({ invitationUuid })

    Requests.sendOk(res, {
      userRole,
      assessment,
      user,
      userProviders,
    })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
