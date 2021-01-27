import './error.less'
import React from 'react'
import Icon from '@webapp/components/icon'

type OwnProps = {
  error?: string
}

type Props = {
  error: any
}

const Error = (props: Props) => {
  const { error } = props

  if (!error) return null

  return (
    <div className="login-error">
      <Icon name="alert" />
      <div>
        {error.split('\n').map((item: any, i: any) => (
          <span key={String(i)}>
            {item}
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
