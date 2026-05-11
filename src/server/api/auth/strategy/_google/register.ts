import { VerifyCallback } from 'passport-google-oauth20'

import { Assessments } from 'meta/assessment/assessments'
import { AuthProvider, AuthProviderGoogleProps } from 'meta/user/auth'

import { UserController } from 'server/controller/user'
import { UserProviderController } from 'server/controller/userProvider'

type Props = {
  done: VerifyCallback
  email: string
  invitationUuid: string
}

export const register = async (props: Props): Promise<void> => {
  const { done, email, invitationUuid } = props

  const { assessment, user: invitedUser, userInvitation } = await UserController.findByInvitation({ invitationUuid })

  let userProvider = await UserProviderController.read<AuthProviderGoogleProps>({
    user: invitedUser,
    provider: AuthProvider.google,
  })

  if (!userProvider) {
    const googleUser = await UserController.getOne({ emailGoogle: email })

    if (!googleUser) {
      userProvider = await UserProviderController.create<AuthProviderGoogleProps>({
        user: invitedUser,
        provider: { provider: AuthProvider.google, props: { email } },
      })
    } else if (invitedUser.id !== googleUser.id) {
      done(null, false, { message: 'login.alreadyLinked' })
      return
    }
  }

  if (!userProvider || userProvider.props.email !== email) {
    done(null, false, { message: 'login.notAuthorized' })
    return
  }

  const cycle = Assessments.getCycle({ assessment, cycleUuid: userInvitation.cycleUuid })
  done(null, invitedUser, { assessmentName: assessment.props.name, cycleName: cycle.name, invitationUuid })
}
