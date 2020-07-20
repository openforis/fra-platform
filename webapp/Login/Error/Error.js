import './error.less'
import React from 'react'
import PropTypes from 'prop-types'
import Icon from '@webapp/components/icon'

const Error = (props) => {
  const { error } = props

  if (!error) return null

  return (
    <div className="login-error">
      <Icon name="alert" />
      <div>
        {error.split('\n').map((item, i) => (
          <span key={String(i)}>
            {item}
            <br />
          </span>
        ))}
      </div>
    </div>
  )
}

Error.propTypes = {
  error: PropTypes.string,
}

Error.defaultProps = {
  error: null,
}

export default Error
