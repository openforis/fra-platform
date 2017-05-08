import React from "react"
import { connect } from "react-redux"
import "./style.less"

const ErrorComponent = ({msg}) => msg ? <div className="ae__container">{msg}</div> : null

export default connect(state => state['applicationError'])(ErrorComponent)
