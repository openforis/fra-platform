import './error.scss'
import React from 'react'
import Icon from '../../../components/icon'
import { useI18n } from '../../../hooks'

type Props = {
  error: string
}

const Error: React.FC<Props> = (props) => {
  const { error } = props
  const i18n = useI18n()

  if (!error) return null

  let key = error
  if (error === 'Missing credentials') key = 'login.missingCredentials'

  return (
    <div className="login-error">
      <Icon name="alert" />
      <div>
        {key.split('\n').map((item, i) => (
          <span key={String(i)}>
            {i18n.t(item)}
            <br />
          </span>
        ))}
      </div>
    </div>
  )
}

export default Error
