import { Request } from 'express'
import { Profile, VerifyFunction } from 'passport-google-oauth'
import { UserRepository } from '@server/repository'

export const googleStrategyVerifyCallback = async (
  _req: Request,
  _accessToken: string,
  _refreshToken: string,
  profile: Profile,
  done: VerifyFunction
): Promise<void> => {
  try {
    const email = profile.emails[0].value.toLowerCase()

    // Handle invitation accept

    const user = await UserRepository.read({ user: { email } })

    if (user) {
      done(null, user)
    } else {
      done(null, false, { message: 'login.notAuthorized' })
    }
  } catch (e) {
    console.log('Error occurred while authenticating', e)
    done(null, false, { message: `${'login.errorOccurred'}: ${e}` })
  }
}
