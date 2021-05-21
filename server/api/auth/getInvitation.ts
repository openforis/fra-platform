import { Express, Response, Request } from 'express'
import { fetchInvitation, findUserByEmail } from '@server/user/userRepository'
import { sendErr } from '@server/utils/requestUtils'

export const AuthGetInvitation = {
  init: (express: Express): void => {
    express.get('/auth/invitation/:uuid', async (req: Request, res: Response) => {
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
