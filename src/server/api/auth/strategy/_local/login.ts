import { Request } from 'express'
import { VerifiedCallback } from 'passport-jwt'

import { AuthProvider, AuthProviderLocalProps } from 'meta/user/auth'
import { Objects } from 'utils/objects'

import { passwordCompare } from 'server/api/auth/utils/passwordUtils'
import { UserController } from 'server/controller/user'
import { UserProviderController } from 'server/controller/userProvider'

type Props = {
  done: VerifiedCallback
  req: Request
  sendErr: (message: string) => void
}

const provider = AuthProvider.local

export const localLogin = async (props: Props): Promise<void> => {
  const { done, req, sendErr } = props

  const { email, password } = req.body
  const user = await UserController.getOne({ email })

  if (user) {
    const userProvider = await UserProviderController.read<AuthProviderLocalProps>({ user, provider })

    if (!Objects.isEmpty(userProvider)) {
      const passwordMatch = await passwordCompare(password, userProvider.props?.password)

      if (passwordMatch) done(null, user)
      else sendErr('login.noMatchingLocalUser')
    } else {
      sendErr('login.noMatchingProvider')
    }
  } else {
    sendErr('login.noMatchingProvider')
  }
}
