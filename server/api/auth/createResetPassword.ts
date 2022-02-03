import { Express, Response, Request } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { validEmail } from '@common/userUtils'
import { Requests } from '@server/utils'
import { Objects } from '@core/utils'
import { UserController } from '@server/controller'

export const AuthCreateResetPassword = {
  init: (express: Express): void => {
    express.post(ApiEndPoint.Auth.ResetPassword.one(), async (req: Request, res: Response) => {
      try {
        const { email } = req.body

        if (Objects.isEmpty(email?.trim())) return Requests.send400(res, 'login.emptyEmail')
        if (!validEmail({ email })) return Requests.send400(res, 'login.invalidEmail')

        const user = await UserController.read({ user: { email } })
        if (!user) return Requests.send400(res, 'login.noMatchingEmail')

        const url = Requests.serverUrl(req)
        const userResetPassword = await UserController.createResetPassword({ user, url })
        if (userResetPassword) return Requests.sendOk(res, { message: 'login.passwordResetSent' })
        return Requests.send400(res, 'login.noMatchingEmail')
      } catch (err) {
        return Requests.sendErr(res, err)
      }
    })
  },
}
