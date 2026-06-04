import { Request } from 'express'
import { VerifiedCallback } from 'passport-jwt'

import { AuthProvider, AuthProviderLocalProps } from 'meta/user/auth'

import { getAndComparePasswordHash } from 'server/api/auth/strategy/_local/getAndComparePasswordHash'
import { UserController } from 'server/controller/user'
import { UserProviderController } from 'server/controller/userProvider'

type Props = {
  done: VerifiedCallback
  req: Request
  sendErr: (message: string) => void
}

const provider = AuthProvider.local

export const localRegister = async (props: Props): Promise<void> => {
  const { done, req, sendErr } = props

  const { invitationUuid } = req.body
  const { user } = await UserController.findByInvitation({ invitationUuid })
  let userProvider = await UserProviderController.read<AuthProviderLocalProps>({ user, provider })

  // first time user access accept an invitation with local account (email/password)
  if (!userProvider) {
    const passwordHashed = await getAndComparePasswordHash({ req })

    // if passwords match, then create the user auth local provider
    if (passwordHashed) {
      userProvider = await UserProviderController.create<AuthProviderLocalProps>({
        user,
        provider: { provider, props: { password: passwordHashed } },
      })
    } else {
      return sendErr('login.noMatchPasswords')
    }
  }

  // if user provider existed or successfully created
  if (userProvider) {
    done(null, user)
  } else {
    sendErr('login.notAuthorized')
  }
}
