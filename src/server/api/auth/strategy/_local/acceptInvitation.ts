import { Request } from 'express'
import { VerifiedCallback } from 'passport-jwt'

import { AuthProvider, AuthProviderLocalProps } from 'meta/user/auth'
import { Users } from 'meta/user/users'

import { getAndComparePasswordHash } from 'server/api/auth/strategy/_local/getAndComparePasswordHash'
import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { UserProviderController } from 'server/controller/userProvider'

type Props = {
  done: VerifiedCallback
  req: Request
  sendErr: (message: string) => void
}

const provider = AuthProvider.local

export const localAcceptInvitation = async (props: Props): Promise<void> => {
  const { done, req, sendErr } = props

  const { invitationUuid } = req.body
  const { user, userInvitation } = await UserController.findByInvitation({ invitationUuid })
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
    // Don't create role if invitation role requires user information
    if (Users.isPersonalInfoRequiredForRole(userInvitation.role)) {
      done(null, user, { invitationUuid })
    } else {
      const { assessment, cycle } = await AssessmentController.getOneWithCycle({
        uuid: userInvitation.assessmentUuid,
        cycleUuid: userInvitation.cycleUuid,
      })

      const userAccepted = await UserController.acceptInvitation({ assessment, cycle, user, userInvitation })

      done(null, userAccepted)
    }
  } else {
    sendErr('login.notAuthorized')
  }
}
