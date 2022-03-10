import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { UserController } from '@server/controller/user'

export const getInvitation = async (req: Request, res: Response) => {
  const { uuid } = req.params
  try {
    const { userRole, assessment, user } = await UserController.readByInvitation({ invitationUuid: uuid })
    res.send({
      userRole,
      assessment,
      user,
    })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
