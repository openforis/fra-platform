import { Request } from 'express'
import { Profile, VerifyFunction } from 'passport-google-oauth'

import { AuthProvider, UserAuthProvider } from '@meta/user'
import { AuthProviderGoogleProps } from '@meta/user/userAuth'

import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import { UserProviderController } from '@server/controller/userProvider'

export const googleStrategyVerifyCallback = async (
  req: Request,
  _accessToken: string,
  _refreshToken: string,
  profile: Profile,
  done: VerifyFunction
): Promise<void> => {
  try {
    const email = profile.emails[0].value.toLowerCase()

    let user = null

    const invitationUuid = req.query.state as string

    if (invitationUuid) {
      const { user: invitedUser, userRole } = await UserController.readByInvitation({ invitationUuid })

      let userProvider = (await UserProviderController.read({
        user: invitedUser,
        provider: AuthProvider.google,
      })) as UserAuthProvider<AuthProviderGoogleProps>

      if (!userProvider) {
        const provider = { provider: AuthProvider.google, props: { email } }
        userProvider = (await UserProviderController.create({
          user: invitedUser,
          provider,
        })) as UserAuthProvider<AuthProviderGoogleProps>
      }

      const googleMatch = userProvider.props.email === email

      if (googleMatch) {
        const { assessment, cycle } = await AssessmentController.getOneWithCycle({
          id: userRole.assessmentId,
          cycleUuid: userRole.cycleUuid,
        })

        user = await UserController.acceptInvitation({ assessment, cycle, user: invitedUser, userRole })

        done(null, user)
      } else {
        done(null, false, { message: 'login.notAuthorized' })
      }
    } else {
      user = await UserController.getOne({ emailGoogle: email })

      if (user) done(null, user)
      else done(null, false, { message: 'login.noMatchingProvider' })
    }
  } catch (e) {
    done(null, false, { message: `${'login.errorOccurred'}: ${e}` })
  }
}
