import { Request } from 'express'
import { Profile, VerifyFunction } from 'passport-google-oauth'
import { UserController, UserProviderController } from '@server/controller'
import { AuthProvider } from '@meta/user'

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
      user = await UserController.acceptInvitation({ user: invitedUser, userRole })
    } else {
      user = await UserController.read({ user: { email } })
      if (user) {
        const userProvider = await UserProviderController.read({ user, provider: AuthProvider.google })
        if (!userProvider) user = null
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
