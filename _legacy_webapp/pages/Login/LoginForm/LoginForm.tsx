import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUrlParameter } from '../../../utils/urlUtils'
import { useI18n } from '../../../hooks'

import { LoginActions } from '../../../store/login'

import Error from '../Error'
import LocalLogin from './LocalLogin'

const LoginForm: React.FC = () => {
  // TODO: refactor with login state
  const { status, invitation, user }: any = useSelector((state: any) => state?.login?.login ?? {})
  const i18n = useI18n()

  const dispatch = useDispatch()
  const [loginLocal, setLoginLocal] = useState(false)
  const loginFailed = getUrlParameter('loginFailed')

  useEffect(() => {
    dispatch(LoginActions.initLogin())
  }, [])

  if (status !== 'loaded') return null

  return (
    <div>
      <Error error={loginFailed ? 'User not authorized' : null} />

      {loginLocal ? (
        <LocalLogin onCancel={() => setLoginLocal(false)} user={user} invitation={invitation} />
      ) : (
        <div className="login__formWrapper">
          <div>
            <a className="btn" href={`/auth/google${invitation ? `?i=${invitation.invitationUuid}` : ''}`}>
              {i18n.t('login.signInGoogle')}
            </a>

            <button className="btn" type="button" onClick={() => setLoginLocal(true)}>
              {i18n.t('login.signInFRA')}
            </button>
          </div>
          <div>
            <div>{i18n.t('login.accessLimited')}</div>
            <div>
              {i18n.t('login.returnHome')} <a href="/">{i18n.t('login.returnHomeClick')}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginForm
