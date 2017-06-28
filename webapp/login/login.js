import React from 'react'
import { connect } from 'react-redux'
import { requestLogin } from './actions'
import './style.less'
import { getUrlParameter } from '../utils/urlUtils'

const LoginView = ({requestLogin}) =>
  <div className="login__root">
    <div className="login__wrapper">
      <img src="img/fao_logo.svg" className="login__fao-logo"/>
      <div className="login__box">
        <img src="img/tucan.svg" className="login__tucan"/>
        <h2 className="login__header headline">Login to FRA Platform</h2>
        {getUrlParameter('u') ? <div className="login__fail-info">User not authorized</div> : ''}
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
