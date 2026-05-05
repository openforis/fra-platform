import { NextFunction, Request, Response } from 'express'
import passport from 'passport'

import { LoginRequest } from 'meta/api/request/auth/login'
import { AreaCode } from 'meta/area/areaCode'
import { AuthToken } from 'meta/auth/token'
import { Routes } from 'meta/routes/routes'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { ProcessEnv } from 'server/utils'

import { setAuthToken } from './utils/setAuthToken'

type RedirectUrlProps = {
  assessmentName: string
  countryIso: AreaCode
  cycleName: string
  msg: { message?: string }
}

const _getRedirectUrl = (props: RedirectUrlProps): string => {
  const { assessmentName, countryIso, cycleName, msg } = props

  const parsedMsg = msg?.message ? (JSON.parse(msg.message) as Record<string, string>) : {}
  const { invitationUuid, requiresUserInfo } = parsedMsg
  const invitedCountryIso = (parsedMsg.countryIso as AreaCode) ?? countryIso

  let redirectPath: string
  if (requiresUserInfo && invitationUuid) {
    redirectPath = Routes.LoginInvitationUserInfo.generatePath({ assessmentName, cycleName, invitationUuid })
  } else {
    redirectPath = !Objects.isEmpty(invitedCountryIso)
      ? Routes.Country.generatePath({ assessmentName, countryIso: invitedCountryIso, cycleName })
      : ''
  }

  return process.env.NODE_ENV === 'development' ? redirectPath || '/' : `${ProcessEnv.appUri}${redirectPath}`
}

export const loginGoogle = (req: LoginRequest, res: Response): void => {
  passport.authenticate('google', {
    session: false,
    scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'],
    state: JSON.stringify({
      assessmentName: req.query.assessmentName,
      countryIso: req.query.countryIso,
      cycleName: req.query.cycleName,
      invitationUuid: req.query.invitationUuid,
    }),
  })(req, res)
}

export const loginGoogleCallback = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('google', { session: false }, (err: Error | null, user: User, msg: { message?: string }) => {
    const state = JSON.parse(req.query.state as string) ?? {}
    const { assessmentName, countryIso, cycleName } = state

    if (err) {
      next(err)
    } else if (!user) {
      res.clearCookie(AuthToken.fraAuthToken)
      res.redirect(Routes.Login.generatePath({ assessmentName, cycleName }, { loginError: msg.message }))
    } else {
      req.login(user, { session: false }, (err: Error | null) => {
        if (err) next(err)
        setAuthToken(res, user)
        res.redirect(_getRedirectUrl({ assessmentName, countryIso, cycleName, msg }))
      })
    }
  })(req, res, next)
}
