import { Request } from 'express'
import { VerifiedCallback } from 'passport-jwt'

import { AuthProvider, AuthProviderLocalProps } from 'meta/user/auth'

import { passwordCompare, passwordHash } from 'server/api/auth/utils/passwordUtils'
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

  const { invitationUuid, password, password2 } = req.body
  const { user, userInvitation } = await UserController.findByInvitation({ invitationUuid })
  let userProvider = await UserProviderController.read<AuthProviderLocalProps>({ user, provider })

  // first time user access accept an invitation with local account (email/password)
  if (!userProvider) {
    const passwordHashed = await passwordHash(password)
    const passwordMatch = await passwordCompare(password2, passwordHashed)

    // if passwords match, then create the user auth local provider
    if (passwordMatch) {
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
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      uuid: userInvitation.assessmentUuid,
      cycleUuid: userInvitation.cycleUuid,
    })

    const userAccepted = await UserController.acceptInvitation({ assessment, cycle, user, userInvitation })

    done(null, userAccepted, {
      assessmentName: assessment.props.name,
      countryIso: userInvitation.countryIso,
      cycleName: cycle.name,
    })
  } else {
    sendErr('login.notAuthorized')
  }
}
