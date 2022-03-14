import { Request } from 'express'
import { Profile, VerifyFunction } from 'passport-google-oauth'
import { AuthProvider } from '@meta/user'
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
      if (invitedUser && invitedUser.status !== 'active') {
        const provider = {
          provider: AuthProvider.google,
          props: {
            email,
          },
        }
        await UserProviderController.create({ user: invitedUser, provider })
      }
      user = await UserController.acceptInvitation({ user: invitedUser, userRole })
    } else {
      user = await UserController.getOne({ user: { email }, emailGoogle: email })
      if (user) {
        await UserProviderController.read({ user, provider: AuthProvider.google })
      }
    }

    if (user) {
      done(null, user)
    } else {
      done(null, false, { message: 'login.notAuthorized' })
    }
  } catch (e) {
    done(null, false, { message: `${'login.errorOccurred'}: ${e}` })
  }
}
