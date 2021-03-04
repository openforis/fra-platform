import './error.less'
import React from 'react'
import Icon from '@webapp/components/icon'
import { useI18n } from '@webapp/components/hooks'

type OwnProps = {
  error?: string
}

type Props = {
  error: any
}

const Error = (props: Props) => {
  const { error } = props
  const i18n = useI18n()
  if (!error) return null

  return (
    <div className="login-error">
      <Icon name="alert" />
      <div>
        {error.split('\n').map((item: any, i: any) => (
          <span key={String(i)}>
            {i18n.t(item)}
            <br />
          </span>
        ))}
      </div>
    </div>
  )
}

Error.defaultProps = {
  error: null,
}

export default Error
