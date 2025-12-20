import { Request } from 'express'
import { VerifiedCallback } from 'passport-jwt'

import { Objects } from 'utils/objects'

import { getAndComparePasswordHash } from 'server/api/auth/strategy/_local/getAndComparePasswordHash'
import { UserController } from 'server/controller/user'

type Props = {
  done: VerifiedCallback
  req: Request
  sendErr: (message: string) => void
}

export const localChangePassword = async (props: Props): Promise<void> => {
  const { done, req, sendErr } = props
  const { email, password, resetPasswordUuid } = req.body

  if (Objects.isEmpty(password)) {
    return sendErr('login.noEmptyPassword')
  }

  const { user, userResetPassword } = await UserController.findByResetPassword({ resetPasswordUuid })

  if (!userResetPassword || user.email !== email) {
    return sendErr('login.errorOccurred')
  }

  const passwordHash = await getAndComparePasswordHash({ req })
  if (passwordHash) {
    const changed = await UserController.changePassword({
      email: user.email,
      password: passwordHash,
      resetPasswordUuid,
    })
    if (changed) {
      return done(null, user)
    }
  } else {
    return sendErr('login.noMatchPasswords')
  }

  return sendErr('login.noLongerValid')
}
