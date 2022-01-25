import { Express, Response, Request } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { validEmail } from '@common/userUtils'
import { Objects } from '@core/utils'
import { UserController } from '@server/controller'
import { sendErr, serverUrl } from '@server/utils/requests'

export const AuthResetPassword = {
  init: (express: Express): void => {
    express.post(ApiEndPoint.Auth.ResetPassword.create(), async (req: Request, res: Response) => {
      try {
        const { email } = req.body

        if (Objects.isEmpty(email)) {
          res.send({ error: 'login.emptyEmail' })
        } else if (!validEmail({ email })) {
          res.send({ error: 'login.invalidEmail' })
        } else {
          const user = await UserController.read({ user: { email } })
          if (!user) {
            res.send({ error: 'login.noMatchingEmail' })
          } else {
            const url = serverUrl(req)
            const userResetPassword = await UserController.createResetPassword({ user, url })
            if (userResetPassword) {
              res.send({ message: 'login.passwordResetSent' })
            } else {
              res.send({ error: 'login.noMatchingEmail' })
            }
          }
        }
      } catch (err) {
        sendErr(res, err)
      }
    })
  },
}
