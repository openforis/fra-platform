import { Request } from 'express'
import { PassportStatic } from 'passport'
import * as GoogleStrategy from 'passport-google-oauth'
import { Profile, VerifyFunction } from 'passport-google-oauth'

import { ApiEndPoint } from '@meta/api/endpoint'
import { AuthProvider, UserAuthProvider } from '@meta/user'
import { AuthProviderGoogleProps } from '@meta/user/userAuth'

import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import { UserProviderController } from '@server/controller/userProvider'

const googleStrategyVerifyCallback = async (
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
        const googleUser = await UserController.getOne({ emailGoogle: email })

        if (!googleUser) {
          userProvider = (await UserProviderController.create({
            user: invitedUser,
            provider: { provider: AuthProvider.google, props: { email } },
          })) as UserAuthProvider<AuthProviderGoogleProps>
        } else if (!(invitedUser.id === googleUser.id)) {
          done(null, false, { message: 'login.alreadyLinked' })
          return
        }
      }

      if (userProvider) {
        const googleMatch = userProvider.props.email === email

        if (googleMatch) {
          const { assessment, cycle } = await AssessmentController.getOneWithCycle({
            id: userRole.assessmentId,
            cycleUuid: userRole.cycleUuid,
          })

          user = await UserController.acceptInvitation({ assessment, cycle, user: invitedUser, userRole })

          done(null, user, {
            message: JSON.stringify({
              countryIso: userRole.countryIso,
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
            }),
          })
        } else {
          done(null, false, { message: 'login.notAuthorized' })
        }
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

export const googleStrategy = (passport: PassportStatic) => {
  const GoogleOAuth2Strategy = GoogleStrategy.OAuth2Strategy

  passport.use(
    new GoogleOAuth2Strategy(
      {
        clientID: process.env.FRA_GOOGLE_CLIENT_ID,
        clientSecret: process.env.FRA_GOOGLE_CLIENT_SECRET,
        callbackURL: ApiEndPoint.Auth.googleCallback(),
        passReqToCallback: true,
      },
      googleStrategyVerifyCallback
    )
  )
}
