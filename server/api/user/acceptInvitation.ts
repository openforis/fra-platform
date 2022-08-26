import { Request, Response } from 'express'

import { UserController } from '@server/controller/user'
import Requests from '@server/utils/requests'

export const acceptInvitation = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params

    const { user, userRole } = await UserController.readByInvitation({ invitationUuid: uuid })
    const acceptedUser = await UserController.acceptInvitation({ user, userRole })
    res.send({
      user: acceptedUser,
    })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
