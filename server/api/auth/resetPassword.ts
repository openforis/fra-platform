import { Express, Response, Request } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { validEmail } from '@common/userUtils'
import { Requests } from '@server/utils'
import { Objects } from '@core/utils'
import { UserController } from '@server/controller'

export const AuthResetPassword = {
  init: (express: Express): void => {
    express.post(ApiEndPoint.Auth.ResetPassword.create(), async (req: Request, res: Response) => {
      try {
        const { email } = req.body

        if (Objects.isEmpty(email?.trim())) Requests.send400(res, 'login.emptyEmail')
        if (!validEmail({ email })) Requests.send400(res, 'login.invalidEmail')

        const user = await UserController.read({ user: { email } })
        if (!user) Requests.send400(res, 'login.noMatchingEmail')

        const url = Requests.serverUrl(req)
        const userResetPassword = await UserController.createResetPassword({ user, url })
        if (userResetPassword) Requests.sendOk(res, { message: 'login.passwordResetSent' })
        else Requests.send400(res, 'login.noMatchingEmail')
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
