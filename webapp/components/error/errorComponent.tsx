import React from 'react'
import { connect } from 'react-redux'
import Icon from '@webapp/components/icon'

import * as ApplicationErrorState from '@webapp/components/error/applicationErrorState'
import { AppSelectors } from '@webapp/store/app/app.slice'
import { clearApplicationError } from './actions'
import './style.less'

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

const ErrorComponent = (props: any) => (props.error ? <ErrorBox {...props} /> : null)

const mapStateToProps = (state: any) => ({
  error: ApplicationErrorState.getError(state),
  i18n: AppSelectors.selectI18n(state),
})

export default connect(mapStateToProps, { clearApplicationError })(ErrorComponent)
