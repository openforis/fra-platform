import { Response } from 'express'

import { CycleRequest } from '@meta/api/request'

import { UserController } from '@server/controller/user'
import Requests from '@server/utils/requests'

export const getInvitation = async (req: CycleRequest<{ invitationUuid: string }>, res: Response) => {
  const { invitationUuid } = req.query
  try {
    const { userRole, assessment, user } = await UserController.readByInvitation({ invitationUuid })
    res.send({
      userRole,
      assessment,
      user,
    })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
