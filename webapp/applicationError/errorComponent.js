import React from 'react'
import { connect } from 'react-redux'
import { clearApplicationError } from './actions'
import './style.less'

const ErrorBox = ({msg, clearApplicationError}) => {
  console.error(msg)
  return <div className="ae__container">
    {msg}
    <button className="ae__clear-button" onClick={() => clearApplicationError()}>X</button>
  </div>
}

const ErrorComponent = (props) => props.msg ? <ErrorBox {...props}/> : null

export default connect(state => state['applicationError'], {clearApplicationError})(ErrorComponent)
