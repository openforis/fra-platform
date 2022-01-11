import { Objects } from '@core/utils'
import { validEmail } from '@common/userUtils'
import { Request } from 'express'
import { UserController } from '@server/controller'
import { UserProviderRepository, UserRepository } from '@server/repository'
import * as bcrypt from 'bcrypt'

export const localStrategyVerifyCallback = async (req: Request, email: string, password: string, done: any) => {
  const sendErr = (message: string) => done(null, false, { message })

  try {
    if (!validEmail({ email })) {
      sendErr('login.invalidEmail')
    } else if (Objects.isEmpty(password.trim())) {
      sendErr('login.noEmptyPassword')
    } else {
      const invitationUuid = String(req.query.invitationUuid)
      if (invitationUuid) {
        const { user: invitedUser } = await UserController.readByInvitation({ invitationUuid })
        if (invitedUser?.status !== 'active') {
          // TODO add password into userprovider
        }
      }

      let user = await UserRepository.read({ user: { email } })
      const userProvider = await UserProviderRepository.read({ user, provider: 'local' })

      const passwordMatch = await bcrypt.compare(password, userProvider.props.password)
      if (passwordMatch) {
        if (invitationUuid) {
          const { user: invitedUser, userRole } = await UserController.readByInvitation({ invitationUuid })
          if (!userRole) {
            sendErr('login.noInvitation')
          } else {
            user = await UserController.acceptInvitation({ user: invitedUser, userRole })
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
    console.log('Error occurred while authenticating', e)
    sendErr(`${'login.errorOccurred'}: ${e}`)
  }
}
