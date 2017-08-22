import React from 'react'
import { connect } from 'react-redux'
import { clearApplicationError } from './actions'
import * as R from 'ramda'

const ErrorBox = ({applicationError, i18n, clearApplicationError}) => {
  console.error(applicationError.msg)
  return <div className="alert-container">
    <div className="alert-error">
      <div className="alert-icon">
        <svg className="icon">
          <use href="img/icons.svg#alert"/>
        </svg>
      </div>
      <div className="alert-message">{applicationError.msg}</div>
      <div className="alert-dismiss" onClick={() => clearApplicationError()}>
        <svg className="icon">
          <use href="img/icons.svg#remove"/>
        </svg>
      </div>
    </div>
  </div>
}

const ErrorComponent = (props) => R.path(['applicationError', 'msg'], props) ? <ErrorBox {...props}/> : null

const mapStateToProps = state => ({applicationError: state.applicationError, i18n: state.user.i18n})

export default connect(mapStateToProps, {clearApplicationError})(ErrorComponent)
