import { Request } from 'express'
import { PassportStatic } from 'passport'
import GoogleStrategy, { Profile, VerifyCallback } from 'passport-google-oauth20'

import { ApiEndPoint } from 'meta/api/endpoint'

import { googleLogin } from 'server/api/auth/strategy/_google/login'
import { register } from 'server/api/auth/strategy/_google/register'

const googleStrategyVerifyCallback = async (
  req: Request,
  _accessToken: string,
  _refreshToken: string,
  profile: Profile,
  done: VerifyCallback
): Promise<void> => {
  try {
    const email = profile.emails[0].value.toLowerCase()
    const state = JSON.parse(req.query.state as string) ?? {}
    const { invitationUuid } = state

    if (invitationUuid) {
      return register({ done, email, invitationUuid })
    }

    return googleLogin({ done, email })
  } catch (e) {
    done(null, false, { message: `${'login.errorOccurred'}: ${e}` })
  }
}

export const googleStrategy = (passport: PassportStatic): void => {
  passport.use(
    new GoogleStrategy.Strategy(
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
