import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { UserController } from '@server/controller'

export const getAcceptInvitation = async (req: Request, res: Response) => {
  const { uuid } = req.params
  try {
    const { user, userRole } = await UserController.readByInvitation({ invitationUuid: uuid })
    const acceptedUser = await UserController.acceptInvitation({ user, userRole })
    res.send({
      user: acceptedUser,
    })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
