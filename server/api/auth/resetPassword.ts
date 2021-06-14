import { Express, Response, Request } from 'express'
import { validEmail } from '@common/userUtils'
import { findLocalUserByEmail, findUserById } from '@server/repository/user/userRepository'
import * as db from '@server/db/db'
import {
  createResetPassword,
  findResetPassword,
} from '@server/repository/userResetPassword/userResetPasswordRepository'
import { sendErr, serverUrl } from '@server/utils/requests'
import { sendResetPasswordEmail } from '@server/api/auth/utils/resetPassword'
import { Objects } from '@core/utils'
import { ApiEndPoint } from '@common/api/endpoint'

export const AuthResetPassword = {
  init: (express: Express): void => {
    // eslint-disable-next-line no-undef
    express.post(ApiEndPoint.Auth.ResetPassword.create(), async (req: Request, res: Response) => {
      try {
        const { email } = req.body

        // validation
        if (Objects.isEmpty(email.trim())) {
          res.send({ error: 'login.emptyEmail' })
        } else if (!validEmail({ email })) {
          res.send({ error: 'login.invalidEmail' })
        } else {
          const user = await findLocalUserByEmail(email)
          if (!user) {
            res.send({ error: 'login.noMatchingEmail' })
          } else {
            // reset password
            const resetPassword = await db.transaction(createResetPassword, [user.id])
            const url = serverUrl(req)

            await sendResetPasswordEmail(user, url, resetPassword.uuid)
            res.send({
              message: 'login.passwordResetSent',
            })
          }
        }
      } catch (err) {
        sendErr(res, err)
      }
    })

    express.get(ApiEndPoint.Auth.ResetPassword.get(), async (req: Request, res: Response) => {
      try {
        const resetPassword = await db.transaction(findResetPassword, [req.params.uuid])
        if (resetPassword) {
          const user = await findUserById(resetPassword.userId)
          res.json({ ...resetPassword, user })
        } else {
          res.json(null)
        }
      } catch (err) {
        sendErr(res, err)
      }
    })
  },
}
