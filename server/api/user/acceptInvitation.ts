import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import Requests from '@server/utils/requests'
import { UserController } from '@server/controller/user'

export const UserAcceptInvitation = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.User.acceptInvitation(), async (req: Request, res: Response) => {
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
    })
  },
}
