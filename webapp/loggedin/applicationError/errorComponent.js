import React from 'react'
import { connect } from 'react-redux'
import { clearApplicationError } from './actions'
import Icon from '@webapp/components/icon'
import * as R from 'ramda'
import './style.less'

const ErrorBox = ({error, i18n, clearApplicationError}) =>
  <div className="alert-container">
    <div className="alert-error">
      <div className="alert-icon">
        <Icon name="alert"/>
      </div>
      <div className="alert-message">{
        error.key
          ? i18n.t(error.key, error.values)
          : error + ''
      }</div>
      <div className="alert-dismiss" onClick={() => clearApplicationError()}>
        <Icon name="remove"/>
      </div>
    </div>
  </div>

const ErrorComponent = props => props.error ? <ErrorBox {...props}/> : null

const mapStateToProps = state => ({error: R.path(['applicationError', 'error'], state), i18n: state.user.i18n})

export default connect(mapStateToProps, {clearApplicationError})(ErrorComponent)
