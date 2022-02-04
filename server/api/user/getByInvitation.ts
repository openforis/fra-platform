import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import Requests from '@server/utils/requests'
import { UserController } from '@server/controller'

export const UserGetByInvitation = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.User.getByInvitation(), async (req: Request, res: Response) => {
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
    })
  },
}
