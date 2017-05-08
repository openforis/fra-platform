import React from "react"
import { connect } from "react-redux"

const ErrorComponent = ({msg}) => msg ? <div>{msg}</div> : null

export default connect(state => state['applicationError'])(ErrorComponent)
