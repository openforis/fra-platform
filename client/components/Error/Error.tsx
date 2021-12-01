import React from 'react'
import { connect } from 'react-redux'
import { clearApplicationError } from './actions'
import Icon from '@webapp/components/icon'
import './style.less'

import * as AppState from '@webapp/store/app/state'
import * as ApplicationErrorState from './applicationErrorState'

const ErrorBox = ({ error, i18n, clearApplicationError }: any) => (
  <div className="alert-container">
    <div className="alert-error">
      <div className="alert-icon">
        <Icon name="alert" />
      </div>
      <div className="alert-message">{error.key ? i18n.t(error.key, error.values) : `${error}`}</div>
      <div className="alert-dismiss" onClick={() => clearApplicationError()}>
        <Icon name="remove" />
      </div>
    </div>
  </div>
)

const Error = (props: any) => (props.error ? <ErrorBox {...props} /> : null)

const mapStateToProps = (state: any) => ({
  error: ApplicationErrorState.getError(state),
  i18n: AppState.getI18n(state),
})

export default connect(mapStateToProps, { clearApplicationError })(Error)
