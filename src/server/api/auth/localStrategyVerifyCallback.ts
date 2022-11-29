import { Objects } from '@utils/objects'
import { Request } from 'express'

import { AuthProvider, AuthProviderLocalProps, UserAuthProvider } from '@meta/user/userAuth'

import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import { UserProviderController } from '@server/controller/userProvider'
import { validEmail } from '@server/utils/validEmail'

import { passwordCompare, passwordHash } from './utils/passwordUtils'

export const localStrategyVerifyCallback = async (req: Request, email: string, password: string, done: any) => {
  const sendErr = (message: string) => done(null, false, { message })

  try {
    if (!validEmail({ email })) {
      sendErr('login.invalidEmail')
    } else if (Objects.isEmpty(password.trim())) {
      sendErr('login.noEmptyPassword')
    } else {
      const invitationUuid = req.query?.invitationUuid as string

      if (invitationUuid) {
        const { user: invitedUser, userRole } = await UserController.readByInvitation({ invitationUuid })

        let userProvider = (await UserProviderController.read({
          user: invitedUser,
          provider: AuthProvider.local,
        })) as UserAuthProvider<AuthProviderLocalProps>

        if (!userProvider) {
          userProvider = (await UserProviderController.create({
            user: invitedUser,
            provider: { provider: AuthProvider.local, props: { password: await passwordHash(password) } },
          })) as UserAuthProvider<AuthProviderLocalProps>
        }

        const passwordMatch = await passwordCompare(password, userProvider.props.password)

        if (passwordMatch) {
          const { assessment, cycle } = await AssessmentController.getOneWithCycle({
            id: userRole.assessmentId,
            cycleUuid: userRole.cycleUuid,
          })

          const user = await UserController.acceptInvitation({ assessment, cycle, user: invitedUser, userRole })

          done(null, user)
        } else {
          sendErr('login.notAuthorized')
        }
      } else {
        const user = await UserController.getOne({ email })

        if (user) {
          const userProvider = (await UserProviderController.read({
            user,
            provider: AuthProvider.local,
          })) as UserAuthProvider<AuthProviderLocalProps>

          if (userProvider) {
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
