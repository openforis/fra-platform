import React from "react"
import { connect } from "react-redux"
import "./style.less"

const ErrorBox = ({msg}) => <div className="ae__container">
    {msg}
    </div>

const ErrorComponent = ({msg}) => msg ? <ErrorBox msg={msg}/> : null

export default connect(state => state['applicationError'])(ErrorComponent)
