import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Objects } from 'utils/objects'

import { useAppDispatch } from 'client/store/hooks'
import { LoginActions } from 'client/store/login/actions'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useToaster } from 'client/hooks/toaster'
import Button, { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import Flex from 'client/components/Layout/Flex'
import Link from 'client/components/Links/Link'
import { Urls } from 'client/utils/urls'

import LocalLoginForm from './LocalLoginForm'

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const assessment = useAssessment()
  const cycle = useCycle()
  const user = useUser()
  const { t } = useTranslation()
  const { toaster } = useToaster()
  const linkClassName = useButtonClassName({ size: ButtonSize.l })

  const loginError = Urls.getRequestParam('loginError')?.replace('#', '')

  const [isLocal, setIsLocal] = useState<boolean>(false)

  useEffect(() => {
    if (user) navigate('/')
  }, [navigate, user])

  useEffect(() => {
    if (!Objects.isEmpty(loginError)) toaster.error(t(loginError))

    dispatch(LoginActions.initLogin())
  }, [dispatch, loginError, t, toaster])

  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  if (isLocal) {
    return <LocalLoginForm onCancel={() => setIsLocal(false)} />
  }

  return (
    <div className="login__formWrapper">
      <Flex gap={'16'}>
        <a
          className={linkClassName}
          href={`${ApiEndPoint.Auth.google()}?assessmentName=${assessmentName}&cycleName=${cycleName}`}
        >
          {t('login.signInGoogle')}
        </a>

        <Button label={t('login.signInFRA')} onClick={() => setIsLocal(true)} size={ButtonSize.l} />
      </Flex>

      <div>
        <div>
          {t('login.accessLimited')}
          <br />
          {t('login.returnHome')} <Link to="/">{t('login.returnHomeClick')}</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
