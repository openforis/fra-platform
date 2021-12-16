import * as cookieParser from 'cookie-parser'
import * as passport from 'passport'
import * as GoogleStrategy from 'passport-google-oauth'
import { UserRepository } from '@server/repository'
import { User } from '@meta/user'
import { Express, Request } from 'express'
import { Profile, VerifyFunction } from 'passport-google-oauth'

const googleStrategyVerifyCallback = async (
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

export const AuthConfig = {
  init: (app: Express) => {
    app.use(cookieParser())
    app.use(passport.initialize())
    app.use(passport.session())

    const GoogleOAuth2Strategy = GoogleStrategy.OAuth2Strategy

    passport.use(
      new GoogleOAuth2Strategy(
        {
          clientID: process.env.FRA_GOOGLE_CLIENT_ID,
          clientSecret: process.env.FRA_GOOGLE_CLIENT_SECRET,
          callbackURL: `/auth/google/callback`,
          passReqToCallback: true,
        },
        googleStrategyVerifyCallback
      )
    )

    // const LocalStrategy = passportLocal.Strategy
    // passport.use(
    //   new LocalStrategy(
    //   )
    // )

    passport.serializeUser((user: User, done) => done(null, user.id))

    passport.deserializeUser((id: number, done) =>
      UserRepository.read({ user: { id } }).then((user: User) => done(null, user))
    )
  },
}
