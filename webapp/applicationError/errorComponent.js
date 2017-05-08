import React from "react"
import { connect } from "react-redux"
import { clearApplicationError } from './actions'
import "./style.less"

const ErrorBox = ({msg, clearApplicationError}) => <div className="ae__container">
    {msg}
    <button onClick={() => clearApplicationError()}>X</button>
    </div>

const ErrorComponent = (props) => props.msg ? <ErrorBox {...props}/> : null

export default connect(state => state['applicationError'], {clearApplicationError})(ErrorComponent)
