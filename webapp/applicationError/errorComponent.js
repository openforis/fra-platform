import React from 'react'
import { connect } from 'react-redux'
import { clearApplicationError } from './actions'

const ErrorBox = ({msg, clearApplicationError}) => {
  console.error(msg)
  return <div className="alert-container">
    <div className="alert-error">
      <div className="alert-icon">
        <svg className="icon"><use xlinkHref="img/icon.svg#icon-alert"/></svg>
      </div>
      <div className="alert-message">{msg}</div>
      <div className="alert-dismiss" onClick={() => clearApplicationError()}>
        <svg className="icon"><use xlinkHref="img/icon.svg#icon-small-remove"/></svg>
      </div>
    </div>
  </div>
}

const ErrorComponent = (props) => props.msg ? <ErrorBox {...props}/> : null

export default connect(state => state['applicationError'], {clearApplicationError})(ErrorComponent)
