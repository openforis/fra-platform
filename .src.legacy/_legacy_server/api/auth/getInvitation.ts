import { Express, Response, Request } from 'express'
import { fetchInvitation, findUserByEmail } from '@server/repository/user/_legacy_userRepository'
import { sendErr } from '@server/utils/requests'
import { ApiEndPoint } from '@common/api/endpoint'

export const AuthGetInvitation = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Auth.getInvitation(), async (req: Request, res: Response) => {
      try {
        const invitation = await fetchInvitation(req.params.uuid, '')
        if (invitation) {
          const user = await findUserByEmail(invitation.email)
          res.json({ invitation, user })
        }
      } catch (err) {
        sendErr(res, err)
      }
    })
  },
}
