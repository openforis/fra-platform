import { validEmail } from '@common/userUtils'
import { Objects } from '@core/utils'
import { Request } from 'express'

import { AuthProvider } from '@meta/user/userAuth'

import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import { UserProviderController } from '@server/controller/userProvider'

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
        const { user: invitedUser } = await UserController.readByInvitation({ invitationUuid })
        if (invitedUser && invitedUser.status !== 'active') {
          const provider = {
            provider: AuthProvider.local,
            props: {
              password: await passwordHash(password),
            },
          }
          await UserProviderController.create({ user: invitedUser, provider })
        }
      }

      let user = await UserController.getOne({ email })

      if (!user) sendErr('login.noMatchingUser')

      const userProvider = await UserProviderController.read({ user, provider: AuthProvider.local })

      const passwordMatch = await passwordCompare(password, userProvider.props.password)
      if (passwordMatch) {
        if (invitationUuid) {
          const { user: invitedUser, userRole } = await UserController.readByInvitation({ invitationUuid })
          if (!userRole) {
            sendErr('login.noInvitation')
          } else {
            const { assessment, cycle } = await AssessmentController.getOneWithCycle({
              id: userRole.assessmentId,
              cycleUuid: userRole.cycleUuid,
            })
            user = await UserController.acceptInvitation({ assessment, cycle, user: invitedUser, userRole })
            done(null, user)
          }
        } else {
          done(null, user)
        }
      } else {
        sendErr('login.noMatchingUser')
      }
    }
  } catch (e) {
    sendErr(`${'login.errorOccurred'}: ${e}`)
  }
}
