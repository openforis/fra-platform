import { Objects } from '@core/utils'
import { validEmail } from '@common/userUtils'
import { Request } from 'express'
import { AuthProvider } from '@meta/user/userAuth'
import { UserController, UserProviderController } from '@server/controller'
import { passwordCompare, passwordHash }  from './utils/passwordUtils'

export const localStrategyVerifyCallback = async (req: Request, email: string, password: string, done: any) => {
  const sendErr = (message: string) => done(null, false, { message })

  try {
    if (!validEmail({ email })) {
      sendErr('login.invalidEmail')
    } else if (Objects.isEmpty(password.trim())) {
      sendErr('login.noEmptyPassword')
    } else {
      const invitationUuid = req.query?.invitationUuid as string
      if (invitationUuid !== undefined) {
        const { user: invitedUser } = await UserController.readByInvitation({ invitationUuid })
        if (invitedUser && invitedUser.status !== 'active') {
          const provider =  {
            provider: AuthProvider.local,
            props: {
              password: await passwordHash(password)
            }
          }
          await UserProviderController.create({ user: invitedUser, provider })
        }
      }

      let user = await UserController.read({ user: { email } })
      
      if (!user) sendErr('login.noMatchingUser')

      const userProvider = await UserProviderController.read({ user, provider: AuthProvider.local })

      const passwordMatch = await passwordCompare(password, userProvider.props.password)
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
