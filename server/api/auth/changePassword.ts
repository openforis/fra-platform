import { Express, Response, Request } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { validPassword } from '@common/userUtils'
import { Requests } from '@server/utils'
import { Objects } from '@core/utils'
import { passwordHash } from '@server/api/auth/utils/passwordUtils'
import { UserController } from '@server/controller'

export const AuthChangePassword = {
  init: (express: Express): void => {
    express.post(ApiEndPoint.Auth.changePassword(), async (req: Request, res: Response) => {
      try {
        const { email, password, password2, uuid } = req.body

        if (Objects.isEmpty(password?.trim()) || Objects.isEmpty(password2?.trim())) Requests.send400(res, 'login.noEmptyPassword')
        if (password?.trim() !== password2?.trim()) Requests.send400(res, 'login.noMatchPasswords')
        if (!validPassword(password)) Requests.send400(res, 'login.passwordError')

        const user = await UserController.read({ user: { email } })
        const hash = await passwordHash(password)
        const changed = await UserController.changePassword({ user, password: hash, resetPasswordUuid: uuid })
        if (changed) Requests.sendOk(res, { message: 'login.passwordChanged' })
        else Requests.send400(res, 'login.noLongerValid')

      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
