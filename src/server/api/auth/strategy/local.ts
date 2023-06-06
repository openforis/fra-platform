import { Request } from 'express'
import { PassportStatic } from 'passport'
import { VerifiedCallback } from 'passport-jwt'
import * as passportLocal from 'passport-local'
import { Objects } from 'utils/objects'

import { AuthProvider, Users } from 'meta/user'
import { AuthProviderLocalProps } from 'meta/user/userAuth'

import { passwordCompare, passwordHash } from 'server/api/auth/utils/passwordUtils'
import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { UserProviderController } from 'server/controller/userProvider'

const localStrategyVerifyCallback = async (req: Request, email: string, password: string, done: VerifiedCallback) => {
  const sendErr = (message: string) => done(null, false, { message })

  try {
    if (!Users.validEmail({ email })) {
      sendErr('login.invalidEmail')
    } else if (Objects.isEmpty(password.trim())) {
      sendErr('login.noEmptyPassword')
    } else {
      const invitationUuid = req.query?.invitationUuid as string

      if (invitationUuid) {
        const { user: invitedUser, userRole } = await UserController.findByInvitation({ invitationUuid })

        const userProviders = await UserProviderController.read<AuthProviderLocalProps>({
          user: invitedUser,
          provider: AuthProvider.local,
        })

        let userProvider = !Objects.isEmpty(userProviders) ? userProviders[0] : null

        if (!userProvider) {
          userProvider = await UserProviderController.create<AuthProviderLocalProps>({
            user: invitedUser,
            provider: { provider: AuthProvider.local, props: { password: await passwordHash(password) } },
          })
        }

        const passwordMatch = await passwordCompare(password, userProvider.props.password)

        if (passwordMatch) {
          const { assessment, cycle } = await AssessmentController.getOneWithCycle({
            id: userRole.assessmentId,
            cycleUuid: userRole.cycleUuid,
          })

          const user = await UserController.acceptInvitation({ assessment, cycle, user: invitedUser, userRole })

          done(null, user, {
            countryIso: userRole.countryIso,
            assessmentName: assessment.props.name,
            cycleName: cycle.name,
          })
        } else {
          sendErr('login.notAuthorized')
        }
      } else {
        const user = await UserController.getOne({ email })

        if (user) {
          const userProviders = await UserProviderController.read<AuthProviderLocalProps>({
            user,
            provider: AuthProvider.local,
          })

          if (!Objects.isEmpty(userProviders)) {
            const [userProvider] = userProviders

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
    }
  } catch (e) {
    sendErr(`${'login.errorOccurred'}: ${e}`)
  }
}

export const localStrategy = (passport: PassportStatic) => {
  const LocalStrategy = passportLocal.Strategy

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      localStrategyVerifyCallback
    )
  )
}
