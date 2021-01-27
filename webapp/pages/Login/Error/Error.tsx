import './error.less'
import React from 'react'
import Icon from '@webapp/components/icon'

type OwnProps = {
  error?: string
}

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof Error.defaultProps

// @ts-expect-error ts-migrate(7022) FIXME: 'Error' implicitly has type 'any' because it does ... Remove this comment to see the full error message
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
