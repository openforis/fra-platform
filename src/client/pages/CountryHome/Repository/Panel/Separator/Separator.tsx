import './Separator.scss'
import React from 'react'

const Separator = () => {
  return (
    <div className="repository-form__separator">
      <hr className="repository-form__separator-line" />
      <span className="repository-form__separator-text">or</span>
      <hr className="repository-form__separator-line" />
    </div>
  )
}

export default Separator
