import { Request } from 'express'
import { Profile, VerifyFunction } from 'passport-google-oauth'
import { UserController } from '@server/controller'

export const googleStrategyVerifyCallback = async (
  _req: Request,
  _accessToken: string,
  _refreshToken: string,
  profile: Profile,
  done: VerifyFunction
): Promise<void> => {
  try {
    const email = profile.emails[0].value.toLowerCase()

    let user = null

    const invitationUuid = String(_req.query.state)
    if (invitationUuid) {
      const { user: invitedUser, userRole } = await UserController.readByInvitation({ invitationUuid })
      user = await UserController.acceptInvitation({ user: invitedUser, userRole })
    } else {
      user = await UserController.read({ user: { email } })
    }

    if (user) {
      done(null, user)
    } else {
      done(null, false, { message: 'login.notAuthorized' })
    }
  } catch (e) {
    // console.log('Error occurred while authenticating', e)
    done(null, false, { message: `${'login.errorOccurred'}: ${e}` })
  }
}
