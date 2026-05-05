import { VerifyCallback } from 'passport-google-oauth20'

import { AuthProvider, AuthProviderGoogleProps } from 'meta/user/auth'
import { Users } from 'meta/user/users'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { UserProviderController } from 'server/controller/userProvider'

type Props = {
  done: VerifyCallback
  email: string
  invitationUuid: string
}

export const googleAcceptInvitation = async (props: Props): Promise<void> => {
  const { done, email, invitationUuid } = props

  const { user: invitedUser, userInvitation } = await UserController.findByInvitation({ invitationUuid })

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

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({
    uuid: userInvitation.assessmentUuid,
    cycleUuid: userInvitation.cycleUuid,
  })

  // Don't create role if invitation role requires user information
  if (Users.isPersonalInfoRequiredForRole(userInvitation.role)) {
    done(null, invitedUser, {
      message: JSON.stringify({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        invitationUuid,
        requiresUserInfo: true,
      }),
    })
    return
  }

  const user = await UserController.acceptInvitation({ assessment, cycle, user: invitedUser, userInvitation })

  done(null, user, {
    message: JSON.stringify({
      assessmentName: assessment.props.name,
      countryIso: userInvitation.countryIso,
      cycleName: cycle.name,
    }),
  })
}
