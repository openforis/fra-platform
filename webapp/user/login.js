import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import { requestLogin } from './actions'
import { getUrlParameter } from '../utils/urlUtils'

const LoginView = ({requestLogin}) =>
  <div className="login__root">
    { getUrlParameter('u') ?
      <div className="alert-container">
          <div className="alert-error">
            <div className="alert-icon">
              <svg className="icon"><use xlinkHref="img/icon.svg#icon-alert"/></svg>
            </div>
            <div className="alert-message">User not authorized</div>
          </div>
        </div>
      : ''}

    <div className="login__wrapper">
      <img src="img/fao_logo.svg" className="login__fao-logo"/>
      <div className="login__box">
        <img src="img/tucan.svg" className="login__tucan"/>
        <h2 className="login__header headline">Login to FRA Platform</h2>
        <div className="login__input-group">
          <a className="btn btn-primary login__btn" href="/auth/google">
            Sign in with Google
          </a>
        </div>
      </div>
      <p className="login__legal">&copy; FAO, 2017</p>
    </div>
  </div>

const mapStateToProps = state => state.user

export default connect(mapStateToProps, {requestLogin})(LoginView)
