import { Response } from 'express'

import { CycleRequest } from '@meta/api/request'

import { UserController } from '@server/controller/user'
import Requests from '@server/utils/requests'

export const getAcceptInvitation = async (req: CycleRequest<{ invitationUuid: string }>, res: Response) => {
  const { invitationUuid } = req.query
  try {
    const { user, userRole } = await UserController.readByInvitation({ invitationUuid })
    const acceptedUser = await UserController.acceptInvitation({ user, userRole })
    res.send({
      user: acceptedUser,
    })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
