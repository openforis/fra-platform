import { Express, Response, Request } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { validPassword } from '@common/userUtils'
import { Objects } from '@core/utils'
import { UserController } from '@server/controller'
import { sendErr } from '@server/utils/requests'
import { passwordHash } from '@server/api/auth/utils/passwordUtils'

export const AuthChangePassword = {
  init: (express: Express): void => {
    express.post(ApiEndPoint.Auth.changePassword(), async (req: Request, res: Response) => {
      try {
        const sendResp = (error: any = null, message: any = null) => res.json({ error, message })

        const { email, password, password2, uuid } = req.body
        if (Objects.isEmpty(password.trim()) || Objects.isEmpty(password2.trim())) {
          sendResp('login.noEmptyPassword')
        } else if (password.trim() !== password2.trim()) {
          sendResp('login.noMatchPasswords')
        } else if (!validPassword(password)) {
          sendResp('login.passwordError')
        } else {
          const user = await UserController.read({ user: { email } })

          const hash = await passwordHash(password)

          const changed = await UserController.changePassword({ user, password: hash, resetPasswordUuid: uuid })
          if (changed) {
            sendResp(null, 'login.passwordChanged')
          } else {
            sendResp('login.noLongerValid')
          }
        }
      } catch (err) {
        sendErr(res, err)
      }
    })
  },
}
