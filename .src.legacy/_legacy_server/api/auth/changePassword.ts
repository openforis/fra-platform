import { Express, Response, Request } from 'express'
import { validPassword } from '@common/userUtils'
import * as db from '@server/db/db_deprecated'
import { changePassword } from '@server/repository/userResetPassword/userResetPasswordRepository'
import { sendErr } from '@server/utils/requests'
import { Objects } from '@core/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { passwordHash } from './utils/passwordHash'

export const AuthChangePassword = {
  init: (express: Express): void => {
    express.post(ApiEndPoint.Auth.changePassword(), async (req: Request, res: Response) => {
      try {
        const sendResp = (error: any = null, message: any = null) => res.json({ error, message })

        const { uuid, userId, password, password2 } = req.body
        if (Objects.isEmpty(password.trim()) || Objects.isEmpty(password2.trim())) {
          sendResp('login.noEmptyPassword')
        } else if (password.trim() !== password2.trim()) {
          sendResp('login.noMatchPasswords')
        } else if (!validPassword(password)) {
          sendResp('login.passwordError')
        } else {
          const hash = await passwordHash(password)
          const changed = await db.transaction(changePassword, [uuid, userId, hash])
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
